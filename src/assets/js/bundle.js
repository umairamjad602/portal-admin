var BREAK_POINT_1 = 1300;
var BREAK_POINT_2 = 992;
var BREAK_POINT_3 = 768;
var BREAK_POINT_4 = 992;
setTimeout(() => {
    sideBarToggleIfSm();
    //Handle side bar 
    $('.sidebar-toggle').click((e) => {
        const sideBarWidth = $('offcanvasScrolling').outerWidth();
        var sidebarWidth = $('.sidebar').outerWidth();
        const lastStyleOfMessageBox = $('.message-box').attr('style');
        const rightCss = $('.message-box').css('right');
        if (sidebarWidth >= 280) {
            $('.sidebar-toggle').attr('style', 'margin-left: 70px !important');
            $('.sidebar').attr('style',
                'width: 65px !important; overflow:hidden;'
            );
            $('.sidebar .hide-if-small').attr('style',
                'display:none !important');
            $('.offcanvas-body .cart').addClass('cart-if-small');
            $('.offcanvas-body .active').addClass('active-if-sm');
            $('.child-view').attr('style', 'margin-left: 65px');
            if ($(window).outerWidth() > BREAK_POINT_2 && $(window).outerWidth() < BREAK_POINT_1) {
                const allSidebarWidth = $('.content').outerWidth() + $('#offcanvasScrolling').outerWidth() + 60;
                $('.message-box').attr('style', `right: ${rightCss}; left: ${allSidebarWidth}px !important`);
            } else if ($(window).outerWidth() > BREAK_POINT_3 && $(window).outerWidth() < BREAK_POINT_2) {
                const allSidebarWidth = $('.content').outerWidth() + 60;
                $('.message-box').attr('style', `right: ${rightCss}; left: ${allSidebarWidth}px !important`);
            } else {
                const allSidebarWidth = $('.content').outerWidth() + $('.inbox-sidebar').outerWidth() + $('#offcanvasScrolling').outerWidth();
                $('.message-box').attr('style', `right: ${rightCss}; left: ${allSidebarWidth}px !important`);
            }
        } else {
            $('.sidebar-toggle').attr('style', 'margin-left: 285px !important');
            $('.sidebar').attr('style',
                'width: 280px !important; overflow:hidden;'
            );
            $('.sidebar .hide-if-small').attr('style',
                'display:inline !important');
            $('.offcanvas-body .cart').removeClass('cart-if-small');
            $('.offcanvas-body .active').removeClass('active-if-sm');
            $('.child-view').attr('style', 'margin-left: 280px');
            if ($(window).outerWidth() > BREAK_POINT_2 && $(window).outerWidth() < BREAK_POINT_1) {
                const allSidebarWidth = $('.content').outerWidth() + $('#offcanvasScrolling').outerWidth() + 60;
                $('.message-box').attr('style', `right: ${rightCss}; left: ${allSidebarWidth}px !important`);
            } else if ($(window).outerWidth() > BREAK_POINT_3 && $(window).outerWidth() < BREAK_POINT_2) {
                const allSidebarWidth = $('.content').outerWidth() + 60;
                $('.message-box').attr('style', `right: ${rightCss}; left: ${allSidebarWidth}px !important`);
            } else {
                const allSidebarWidth = $('.content').outerWidth() + $('.inbox-sidebar').outerWidth() + $('#offcanvasScrolling').outerWidth();
                $('.message-box').attr('style', `right: ${rightCss}; left: ${allSidebarWidth}px !important`);
            }
        }
    });
    //handle inbox sidebar
    handleInboxSideBar();
    // handle profile sidebar
    handleProfileSidebar();
}, 500);
function handleProfileSidebar() {
    $('.user-card').click((e) => {
        let prevStyle = $('.message-box').attr('style');
        $('.message-box').attr('style', prevStyle + '; right: 265px');
    });
}
function handleInboxSideBar() {
    $('.inbox-sidebar-toggle').click((e) => {
        const rightCss = $('.message-box').css('right');
        var inboxSideBarWidth = $('.inbox-sidebar').outerWidth();
        if (inboxSideBarWidth >= 300) {
            $('.inbox-sidebar').attr('style', 'width: 60px !important;');
            $('.inbox-sidebar .hide-if-small').attr('style',
                'display:none !important');
            $('.inbox-sidebar .navbar-brand').addClass('inbox-sidebar-toggle-if-sm');
            $('.inbox-sidebar .inbox-sidebar-items').addClass('inbox-sidebar-items-if-sm');
            $('.inbox-sidebar .hight-if-small').attr('style', 'margin-top: 20px !important');
            if ($(window).outerWidth < BREAK_POINT_1) {
                //     $('.users-list').attr('style', 'margin-left: 60px !important');
            } else {
                $('.users-list').attr('style', 'margin-left: 60px !important');
                const allSidebarWidth = $('.content').outerWidth() + $('.inbox-sidebar').outerWidth() + $('#offcanvasScrolling').outerWidth();
                $('.message-box').attr('style', `right: ${rightCss}; left: ${allSidebarWidth}px !important;`);
            }
        } else {
            $('.inbox-sidebar').attr('style', 'width: 300px !important;');
            $('.inbox-sidebar .hide-if-small').attr('style',
                'display: !important');
            $('.inbox-sidebar .navbar-brand').removeClass('inbox-sidebar-toggle-if-sm');
            $('.inbox-sidebar .inbox-sidebar-items').removeClass('inbox-sidebar-items-if-sm');
            $('.inbox-sidebar .hight-if-small').attr('style', 'margin-top: auto !important');
            if ($(window).outerWidth() < BREAK_POINT_1) {
                $('.users-list').attr('style', 'margin-left: 60px !important');
            } else {
                $('.users-list').attr('style', 'margin-left: 300px !important');
                const allSidebarWidth = $('.content').outerWidth() + $('.inbox-sidebar').outerWidth() + $('#offcanvasScrolling').outerWidth();
                $('.message-box').attr('style', `right: ${rightCss}; left: ${allSidebarWidth}px !important`);
            }
        }
    })
}
function sideBarToggleIfSm() {
    $('.sidebar-toggle-sm').click((e) => {
        if ($('.sidebar').outerWidth() > 1) {
            $('.sidebar').attr('style', 'width: 0px !important; display: none !important;');
            $('.sidebar-toggle-sm').attr('style', 'margin-left: 0px');
        } else {
            $('.sidebar').attr('style', 'width: 280px !important; display:  !important;');
            $('.inbox-sidebar').attr('style', 'width: 0px !important; display: none !important;');
            $('.sidebar-toggle-sm').attr('style', 'margin-left: 285px');
        }
    });
    $('.inbox-sidebar-btn').click((e) => {
        $('.inbox-sidebar').attr('style', 'width: 300px !important; display: inline !important;');
    });


    $('.inbox-sidebar .inbox-sidebar-toggle-mobile').click((e) => {
        if ($(window).outerWidth() < BREAK_POINT_3) {
            $('.inbox-sidebar').attr('style', 'width: 0px !important; display: none !important;');
        }
    });
    $('.inbox-sidebar-toggle-tablet').click((e) => {

        $('.inbox-sidebar').attr('style', 'display: none');
    })
}