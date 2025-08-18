import React from "react";
import { Search, Menu, X, ChevronDown, Check, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import logo from "../../assets/logo.jpg";
import arabic from "../../assets/eg.jpeg";
import english from "../../assets/usa.png";
import { getInitials } from "../../Utils/getInitials";

const Header = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [toggleSearch, setToggleSearch] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(null);
  const [languageDropdownOpen, setLanguageDropdownOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    localStorage.getItem("language") || "en"
  );


  const languages = [
    { code: "ar", name: "Arabic", flag: arabic },
    { code: "en", name: "English", flag: english },
  ];

  const handleToggleSearch = () => {
    setToggleSearch(!toggleSearch);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileMenuOpen) {
      setOpenDropdown(null);
    }
  };

  const handleDropdownToggle = (menuItem) => {
    setOpenDropdown(openDropdown === menuItem ? null : menuItem);
  };

  const handleLanguageDropdownToggle = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

  const handleLanguageChange = (code) => {
    localStorage.setItem("language", code);
    i18n.changeLanguage(code);
    setSelectedLanguage(code);
    setLanguageDropdownOpen(false);
  
  };

 
  const getCurrentLanguage = () => {
    return (
      languages.find((lang) => lang.code === selectedLanguage) || languages[1]
    );
  };

  const menuItems = [
    {
      name: t("navbar.home"),
      href: "/",
    },
    {
      name: t("navbar.courses"),
      href: "/courses",
      // submenu: [
      //     { name: t("navbar.submenu.course_list"), href: '/courses' },
      //     { name: t("navbar.submenu.course_single"), href: '/' }
      // ]
    },
    // {
    //     name: t("navbar.events"),
    //     href: '/eventsList',
    //     submenu: [
    //         { name: t("navbar.submenu.event_list"), href: '/eventsList' },
    //         { name: t("navbar.submenu.event_single"), href: '/' }
    //     ]
    // },
    // {
    //     name: t("navbar.pages"),
    //     href: '#',
    //     submenu: [
    //         // { name:t("navbar.submenu.404_page") , href: '404.html' },
    //         { name: t("navbar.submenu.about_us"), href: '/' },
    //         { name: t("navbar.submenu.forum_page"), href: '/' },
    //         { name:  t("navbar.submenu.forum_single"), href: '/' },
    //         { name:  t("navbar.submenu.instructors_list"), href: '/' },
    //         { name: t("navbar.submenu.instructors_single"), href: '/' },
    //         { name:  t("navbar.submenu.login_register"), href: '/' }
    //     ]
    // },
    // {
    //     name: t("navbar.blog"),
    //     href: '#',
    //     submenu: [
    //         { name:  t("navbar.submenu.blog_list"), href: '/' },
    //         { name:  t("navbar.submenu.blog_single"), href: '/' }
    //     ]
    // },
    // {
    //     name: t("navbar.shop"),
    //     href: '/shop',
    //     submenu: [
    //         { name:  t("navbar.submenu.shop_list"), href: '/shop' },
    //         { name:  t("navbar.submenu.shop_single"), href: '/' },
    //         { name:  t("navbar.submenu.cart_page"), href: '/' },
    //         { name:  t("navbar.submenu.checkout"), href: '/' }
    //     ]
    // },
    {
      name: t("navbar.submenu.subscriptions"),
      href: "/subscriptions",
      submenu: null,
    },
    {
      name: t("navbar.contact"),
      href: "/contact",
      submenu: null,
    },
  ];

  return (
    <>
      <header id="page-header" className="sticky top-0 z-50">
        <TopBar />

        {/* Main header */}
        <div className="bg-white z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20 py-2">
              {/* Logo */}
              <div className="flex-shrink-0 ">
                <a href="home.html" className="flex items-center w-14 h-14 md:w-16 md:h-16 bg-amber-100 rounded-full overflow-hidden">
                  <img src={logo} alt="" className="w-14 h-14 md:w-16 md:h-16 " />
                </a>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                {menuItems.map((item, index) => (
                  <div key={index} className="relative group">
                    <Link
                      to={item.href}
                      className="text-gray-700 hover:text-yellow-600 uppercase text-sm font-medium flex items-center py-2 transition-colors"
                    >
                      {item.name}
                    </Link>

                    {item.submenu && (
                      <div
                        className={`absolute ${
                          i18n.language == "ar" ? "right-0" : "left-0"
                        }  mt-0 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}
                      >
                        <div className="py-2">
                          {item.submenu.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:text-white hover:bg-yellow-500 transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Desktop Search & Language */}
                <div className="hidden lg:flex items-center space-x-4">
                  <div className="relative">
                    <button
                      onClick={handleToggleSearch}
                      className="text-gray-600 hover:text-yellow-600 p-2 transition-colors"
                    >
                      <Search className="h-5 w-5" />
                    </button>

                    {toggleSearch && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border">
                        <div className="p-2">
                          <input
                            type="text"
                            // placeholder="Search..."
                            placeholder={t("navbar.search_placeholder")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                            autoFocus
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Language Dropdown */}
                  <div className="relative">
                    <button
                      onClick={handleLanguageDropdownToggle}
                      className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 p-2 transition-colors"
                    >
                      <img
                        src={getCurrentLanguage().flag}
                        alt={getCurrentLanguage().name}
                        className="w-5 h-5 rounded-sm"
                      />
                      <span className="text-sm font-medium">
                        {getCurrentLanguage().name}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          languageDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {languageDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                        <div className="py-2">
                          {languages.map((language) => (
                            <button
                              key={language.code}
                              onClick={() =>
                                handleLanguageChange(language.code)
                              }
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <div className="w-5 h-5 mr-3">
                                {selectedLanguage === language.code ? (
                                  <div className="bg-yellow-500 rounded-full flex items-center justify-center w-5 h-5">
                                    <Check className="w-3 h-3 text-white" />
                                  </div>
                                ) : (
                                  <div className="border-2 border-gray-300 rounded-full w-5 h-5"></div>
                                )}
                              </div>
                              <img
                                src={language.flag}
                                alt={language.name}
                                className="w-5 h-5 rounded-sm mr-3"
                              />
                              <span className="flex-1 text-left">
                                {language.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
{sessionStorage.getItem("token") || localStorage.getItem("token")? 
                  <Link to={"/profile"}>
                    <div className=" w-10 h-10  cursor-pointer rounded-full flex justify-center items-center bg-yellow-100 text-yellow-400">
                      {getInitials(sessionStorage.getItem("name"))}
                    </div>
                  </Link>

:"" }

                </div>
              </nav>

              {/* Mobile menu button */}
              <div className="lg:hidden flex items-center space-x-2">
                <button
                  onClick={handleToggleSearch}
                  className="text-gray-600 hover:text-yellow-600 p-2 transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>

                {/* Mobile Language Dropdown */}
                <div className="relative">
                  <button
                    onClick={handleLanguageDropdownToggle}
                    className="flex items-center text-gray-600 hover:text-yellow-600 p-2 transition-colors"
                  >
                    <img
                      src={getCurrentLanguage().flag}
                      alt={getCurrentLanguage().name}
                      className="w-5 h-5 rounded-sm"
                    />
                  </button>

                  {languageDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border z-50">
                      <div className="py-2">
                        {languages.map((language) => (
                          <button
                            key={language.code}
                            onClick={() => handleLanguageChange(language.code)}
                            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-4 h-4 mr-2">
                              {selectedLanguage === language.code ? (
                                <div className="bg-yellow-500 rounded-full flex items-center justify-center w-4 h-4">
                                  <Check className="w-2 h-2 text-white" />
                                </div>
                              ) : (
                                <div className="border-2 border-gray-300 rounded-full w-4 h-4"></div>
                              )}
                            </div>
                            <img
                              src={language.flag}
                              alt={language.name}
                              className="w-4 h-4 rounded-sm mr-2"
                            />
                            <span className="text-xs">{language.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
           

                <button
                  onClick={handleMobileMenuToggle}
                  className="text-gray-600 hover:text-yellow-600 p-2 transition-colors"
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            {toggleSearch && (
              <div className="lg:hidden border-t border-gray-200 py-3">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  autoFocus
                />
              </div>
            )}

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden border-t border-gray-200">
                <div className="py-2 space-y-1 max-h-96 overflow-y-auto">
                  {menuItems.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between">
                        <Link
                          to={item.submenu ? "/" : item.href}
                          className="block px-4 py-3 text-gray-700 hover:text-yellow-600 hover:bg-gray-50 uppercase text-sm font-medium flex-1 transition-colors"
                          onClick={
                            item.submenu
                              ? (e) => {
                                  e.preventDefault();
                                  handleDropdownToggle(item.name);
                                }
                              : undefined
                          }
                        >
                          {item.name}
                        </Link>
                        {item.submenu && (
                          <button
                            onClick={() => handleDropdownToggle(item.name)}
                            className="px-4 py-3 text-gray-500 hover:text-yellow-600 transition-colors"
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                openDropdown === item.name ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {item.submenu && openDropdown === item.name && (
                        <div className="bg-gray-50">
                          {item.submenu.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={subItem.href}
                              className="block px-8 py-2 text-sm text-gray-600 hover:text-yellow-600 hover:bg-gray-100 transition-colors"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {sessionStorage.getItem("token") || localStorage.getItem("token")?
                  <Link to={"/profile"} className="flex gap-4 items-center px-4 py-3 text-gray-700 hover:text-yellow-600 hover:bg-gray-50 uppercase text-sm font-medium transition-colors">
                    <div className=" w-10 h-10  rounded-full flex justify-center items-center bg-yellow-100 text-yellow-400">
                      {getInitials(sessionStorage.getItem("name"))}   
                    </div>
                    <span className="text-gray-700">Profile</span>
                  </Link>
                  : ""}
                

{/* 
                        <Link to={"/profile"} className="flex gap-4 items-center">
                //   <div className=" w-10 h-10  rounded-full flex justify-center items-center bg-yellow-100 text-yellow-400">
                //     {getInitials("Ahmed", "helmy")}
                //   </div>
                //   <span className="text-gray-700">Profile</span>
                 </Link> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

     
    </>
  );
};

export default Header;
