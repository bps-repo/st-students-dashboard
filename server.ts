import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

// Polyfills for browser APIs not available in Node.js
if (typeof globalThis.requestAnimationFrame === 'undefined') {
  globalThis.requestAnimationFrame = function (callback) {
    const id = setTimeout(callback, 0);
    return id;
  };
}

if (typeof globalThis.cancelAnimationFrame === 'undefined') {
  globalThis.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
}

// Add other browser API polyfills if needed
if (typeof globalThis.window === 'undefined') {
  // Create a minimal window object that satisfies the Window interface
  // @ts-ignore
  const windowPolyfill = {
    document: null,
    location: { href: '/' },
    navigator: null,
    localStorage: {
      getItem: () => null,
      setItem: () => null,
      removeItem: () => null,
    },
    sessionStorage: {
      getItem: () => null,
      setItem: () => null,
      removeItem: () => null,
    },
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    requestAnimationFrame: globalThis.requestAnimationFrame,
    cancelAnimationFrame: globalThis.cancelAnimationFrame,
    getComputedStyle: () => ({}),
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
    scrollTo: () => {},
    scrollBy: () => {},
    scroll: () => {},
    resizeTo: () => {},
    resizeBy: () => {},
    matchMedia: () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }),
    innerWidth: 1024,
    innerHeight: 768,
    outerWidth: 1024,
    outerHeight: 768,
    devicePixelRatio: 1,
    screen: {
      width: 1024,
      height: 768,
      availWidth: 1024,
      availHeight: 768,
      colorDepth: 24,
      pixelDepth: 24,
    },
    name: '',
    parent: null as typeof windowPolyfill | null,
    top: null as typeof windowPolyfill | null,
    self: null as typeof windowPolyfill | null,
  };

  // Set self-references
  windowPolyfill.self = windowPolyfill;
  windowPolyfill.parent = windowPolyfill;
  windowPolyfill.top = windowPolyfill;

  // Assign to global
  globalThis.window = windowPolyfill as any;
}

if (typeof globalThis.document === 'undefined') {
  // Create a minimal document object that satisfies the Document interface
  const documentPolyfill = {
    createElement: (tagName: string) => {
      return {
        tagName,
        style: {},
        setAttribute: () => {},
        getAttribute: () => null,
        appendChild: () => {},
        removeChild: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
        children: [],
        childNodes: [],
        classList: {
          add: () => {},
          remove: () => {},
          contains: () => false,
          toggle: () => false,
        },
      };
    },
    createElementNS: (namespace: string, tagName: string) => {
      const element = (globalThis.document as any).createElement(tagName);
      element.namespaceURI = namespace;
      return element;
    },
    getElementsByTagName: (tagName: string) => {
      const collection = [] as any;
      collection.item = (index: number) => collection[index] || null;
      collection.namedItem = (name: string) => null;
      return collection;
    },
    querySelector: () => null,
    querySelectorAll: () => [],
    documentElement: {
      style: {},
      appendChild: () => {},
      removeChild: () => {},
    },
    head: {
      appendChild: () => {},
      removeChild: () => {},
    },
    body: {
      appendChild: () => {},
      removeChild: () => {},
      style: {},
    },
    implementation: {
      createHTMLDocument: (title: string) => globalThis.document,
    },
    location: { href: '/' },
    cookie: '',
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  };

  // Assign to global
  globalThis.document = documentPolyfill as any;

  // Link document to window
  if (globalThis.window) {
    (globalThis.window as any).document = globalThis.document;
  }
}

if (typeof globalThis.navigator === 'undefined') {
  // Create a minimal navigator object that satisfies the Navigator interface
  const navigatorPolyfill = {
    userAgent: 'node',
    language: 'en-US',
    languages: ['en-US'],
    platform: 'node',
    appName: 'Node.js',
    appVersion: process.version,
    vendor: 'Node.js',
    clipboard: {
      readText: async () => '',
      writeText: async () => {},
    },
    credentials: {
      get: async () => null,
      store: async () => {},
    },
    geolocation: {
      getCurrentPosition: () => {},
      watchPosition: () => 0,
      clearWatch: () => {},
    },
    onLine: true,
    hardwareConcurrency: 4,
    maxTouchPoints: 0,
    cookieEnabled: false,
    doNotTrack: '1',
  };

  // Assign to global
  globalThis.navigator = navigatorPolyfill as any;

  // Link navigator to window
  if (globalThis.window) {
    (globalThis.window as any).navigator = globalThis.navigator;
  }
}

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '**',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: 'index.html',
    })
  );

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
