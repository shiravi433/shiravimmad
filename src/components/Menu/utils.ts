import { ConfigMenuItemsType } from './config/config'

export const getActiveMenuItem = ({ pathname, menuConfig }: { pathname: string; menuConfig: ConfigMenuItemsType[] }) =>
  menuConfig.find((menuItem) => pathname.includes(menuItem.href) || getActiveSubMenuItem({ menuItem, pathname }))

export const getActiveSubMenuItem = ({ pathname, menuItem }: { pathname: string; menuItem?: ConfigMenuItemsType }) => {
  const activeSubMenuItems = menuItem?.items.filter((subMenuItem) => pathname.includes(subMenuItem.href))

  // Pathname doesn't include any submenu item href - return null
  if (activeSubMenuItems.length === 0) {
    return null
  }

  // Pathname includes one sub menu item href - return it
  if (activeSubMenuItems.length === 1) {
    return activeSubMenuItems[0]
  }

  // Pathname includes multiple sub menu item hrefs - find the most specific match
  const splitIntoParts = activeSubMenuItems.map((subMenuItem) => {
    return { label: subMenuItem.label, href: subMenuItem.href.split('/') }
  })

  const mostSpecificMatch = splitIntoParts.sort(
    (subMenuItem1, subMenuItem2) => subMenuItem2.href.length - subMenuItem1.href.length,
  )[0]
  return { ...mostSpecificMatch, href: mostSpecificMatch.href.join('/') }
}
