import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';
import { rootRouteRef } from './routes';

export const publicCloudSecurityGroupsPlugin = createPlugin({
  id: 'public-cloud-security-groups',
  routes: {
    root: rootRouteRef,
  },
});

export const PublicCloudSecurityGroupsPage = publicCloudSecurityGroupsPlugin.provide(
  createRoutableExtension({
    name: 'PublicCloudSecurityGroupsPage',
    component: () =>
      import('./components/pages/InfraSecurityGroupPage').then(
        m => m.InfraSecurityGroupPage,
      ),
    mountPoint: rootRouteRef,
  }),
);
