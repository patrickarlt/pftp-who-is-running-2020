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
      { title: "Who Can Vote", href: "https://people4thepeople.org/whocanvote/" },
      { title: "Your Vote Matters", href: "https://people4thepeople.org/yourvotematters/" },
      { title: "Key Voting Issues", external: true, href: "https://p4tp-ourcommunity.hub.arcgis.com/" },
      { title: "Who's Running", href: "#" },
      { title: "Resources", external: true, href: "https://people4thepeople.org/resources/" },
      { title: "Toolkit", external: true, href: "https://election-toolkit-1-ourcommunity.hub.arcgis.com/" },

    ];
    return (
      <header role="navigation" aria-label="navigation" className={styles.siteHeader}>
        <div className={styles.contentContainer}>
          <a href="https://people4thepeople.org" className={styles.logo} ><Logo /></a>
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
                  <a
                    href={item.href}
                    className={item.title === "Who's Running" ? styles.activeLink : "test"}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    );
  }
}
