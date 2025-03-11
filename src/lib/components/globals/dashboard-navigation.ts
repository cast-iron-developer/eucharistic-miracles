import type { NavigationListType } from '$lib/utils/types/general-types';

export const dashboardNavigation: NavigationListType = {
	navigationListItems: [
		{
			title: 'Dashboard',
			icon: {
				icon: 'mdi:home-outline',
				height: '24',
				width: '24'
			},
			href: '/dashboard'
		},
		{
			title: 'Miracles',
			icon: {
				icon: 'streamline:religion-christianity-religion-jesus-christianity-christ-fish-culture',
				height: '24',
				width: '24'
			},
			href: '/dashboard/miracles'
		},
		{
			title: 'Saints',
			icon: {
				icon: 'mdi:shield-cross-outline',
				height: '24',
				width: '24'
			},
			href: '/dashboard/saints'
		},
		{
			title: 'Our Lady',
			icon: {
				icon: 'emojione-monotone:fleur-de-lis',
				height: '24',
				width: '24'
			},
			href: '/dashboard/our-lady'
		},
		{
			title: 'User Management',
			icon: {
				icon: 'pajamas:user',
				height: '24',
				width: '24'
			},
			href: '/dashboard/user-management'
		}
	]
};
