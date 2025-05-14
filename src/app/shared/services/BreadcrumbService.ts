import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject, filter} from 'rxjs';


export interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this.breadcrumbs.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: Breadcrumb[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);

      // Always start with Home
      breadcrumbs.unshift({
        label: 'Inicio',
        url: '/home'
      });

      this.breadcrumbs.next(breadcrumbs);
    });
  }

  private addBreadcrumb(
    route: ActivatedRouteSnapshot,
    parentUrl: string[],
    breadcrumbs: Breadcrumb[]
  ) {
    if (route) {
      // Build the URL
      const routeUrl = parentUrl.concat(route.url.map(url => url.path));

      // Get the route data
      const routeData = route.data;

      // Add breadcrumb if there's breadcrumb data
      if (routeData['breadcrumb']) {
        breadcrumbs.push({
          label: routeData['breadcrumb'],
          url: '/' + routeUrl.join('/')
        });
      } else if (route.routeConfig && route.routeConfig.path !== '') {
        // If no breadcrumb data but there is a path, generate from the path
        const pathSegment = route.routeConfig.path;
        if (pathSegment && pathSegment !== '' && !pathSegment.includes(':')) {
          breadcrumbs.push({
            label: this.formatPathSegment(pathSegment),
            url: '/' + routeUrl.join('/')
          });
        }
      }

      // Recursively process all child routes
      if (route.firstChild) {
        this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
      }
    }
  }

  private formatPathSegment(segment: string): string {
    // Convert kebab-case to Title Case (e.g., 'video-courses' to 'Video Courses')
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
