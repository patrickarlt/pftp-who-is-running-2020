import React, { Component } from "react";
import Logo from "../Logo/Logo";
import styles from "./SiteHeader.module.css";
import { classNames } from "react-extras";
export default class SiteHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMobileMenu: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({
      showMobileMenu: !this.state.showMobileMenu
    });
  }

  render() {
    const menuToggleIcon = this.state.showMobileMenu ? "x" : "hamburger";
    const items = [
      {
        title: "Why Vote", external: true, href: "#", dropdown: [
          { title: "Who Can Vote?", href: "https://p4tp-wip.netlify.app/whyvote/whocanvote/" },
          { title: "Your Vote Matters", href: "https://p4tp-wip.netlify.app/whyvote/yourvotematters/" }
        ]
      },
      { title: "Key Voting Issues", external: true, href: "https://p4tp-ourcommunity.hub.arcgis.com/" },
      { title: "Who's Running", href: "#" },
      { title: "Resources", external: true, href: "https://p4tp-wip.netlify.app/resources/" },
      { title: "Toolkit", external: true, href: "https://election-toolkit-1-ourcommunity.hub.arcgis.com/" },

    ];
    return (
      <header role="navigation" aria-label="navigation" className={styles.siteHeader}>
        <div className={styles.contentContainer}>
          <a href="https://p4tp-wip.netlify.app" className={styles.logo} ><Logo /></a>
          <div className={styles.navigationWrapper} onClick={this.toggleMenu}>
            <ul className={classNames(styles.siteNavigation, styles.mobileNavigation)}>
              <li className="mobile-menu-toggle">
                <a href="#/" onClick={() => this.toggleMenu()} tabIndex="0">
                  <calcite-icon icon={menuToggleIcon} />
                </a>
              </li>
            </ul>
          </div>
          <div className={classNames(styles.navigationWrapper, styles.mobileWrapper, { [styles.isActive]: this.state.showMobileMenu })}>
            <ul className={styles.siteNavigation}>
              {items.map((item, index) => (
                <li key={index}>
                  {item.dropdown ? (
                    <calcite-dropdown type="hover" theme="dark">
                      <a
                        tabIndex="0"
                        slot="dropdown-trigger"
                        className="nav-dropdown-trigger"
                        href={item.href}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {item.title}
                      </a>
                      <calcite-dropdown-group>
                        {item.dropdown.map((dropdownItem, index) => (
                          <calcite-dropdown-item key={index} href={dropdownItem.title} class={styles.dropdownItem}>
                            {dropdownItem.title}
                          </calcite-dropdown-item>
                        ))}
                      </calcite-dropdown-group>
                    </calcite-dropdown>
                  ) : item.external ? (
                    <a href={item.href} target="_blank" rel="noreferrer noopener">
                      {item.title}
                    </a>
                  ) : (
                        <a
                          href={item.href}
                          className={item.title === "Who's Running" ? styles.activeLink : "test"}
                        >
                          {item.title}
                        </a>
                      )}
                </li>
              ))
              }
            </ul>
          </div>
        </div>
      </header>
    );
  }
}
