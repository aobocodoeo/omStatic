$(document).ready(function () {
    //图片预加载
    $(".lazy").lazyload({
        effect: "fadeIn",
        threshold: 200,
        failurelimit: 5 // 发生混乱时的hack手段
    });
    var EXPIRE_DAYS = 1;
    var KEY = 'dialog';
    var VALUE = 'wechat';
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };
    //  注入灵魂
    if(document.location.pathname.includes("detail")){
        if (getCookie(KEY) == VALUE) {
            
        } else {
            $('.pile-dialog-wrap').addClass('dialog-show');
            setCookie(KEY, VALUE, EXPIRE_DAYS);
        }
    }
    // 关闭 dialog
    $(function(){
        $('.but-close').on('click', function () {
            $('.pile-dialog-wrap').removeClass('dialog-show');
        });
        $('#_Follow-btn').on('click', function () {
            $('.pile-dialog-wrap').addClass('dialog-show');
        })

    })

    $(function(){
        $('#_Follow').on('click',function(){
            if(UA.weChat){
                window.location.href = config['share_link']
            }else{
                window.location.href = config['share_link']
            }
        })
    })
    //tips loading
    $(function() {
        $('a').on('click', function() {
            var text = config['weixin_nav'];
            var addHtml = `<textarea id="a1" style="position:absolute;top:-9999px;left:-9999px;" readonly>${text}</textarea>`;
            $('body').append(addHtml);
            if(UA.iOS){
                var copyDOM = document.querySelectorAll('#a1');
                var range = document.createRange();  
                range.selectNode(copyDOM[0]);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('copy');
            }else{
                $("#a1").select();
                document.execCommand("copy",false,null);
            }
    
        })
    });
    // 滑动组件-平缓
    var swiper = new Swiper('#mainSwiper', {
        effect: 'slide',
        centeredSlides: true,
        autoplay: {
            delay: 2500, //切换时间
            disableOnInteraction: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });
    // 滑动组件-3D
    var swiper3d = new Swiper('#swiper3d', {
        effect: 'coverflow',
        spaceBetween: 0,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 2,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: true,
        }
    });
    // 点击呼出导航
    $(function () {
        $('.menu-but').on('click', function () {
            var $box = $(".nav-menu-box");
            if ($box.hasClass('show')) {
                $box.removeClass('show');
            } else {
                $box.addClass('show');
            }
        })
    });
    // 简介展开
    $(function () {
        $('.u-flex').on('click', function () {
            var $intro = $('.m-intro');
            var $flex = $('.u-flex');
            if ($intro.hasClass('show')) {
                $intro.removeClass('show');
                $flex.removeClass('show');
            } else {
                $intro.addClass('show');
                $flex.addClass('show');
            }
        })
    });
    //share
    $(function () {
        var shareHtml = `<div class="share" id="_close">
                                <div class="top">
                                    <div class="arrow"></div>
                                    <div class="open-safari">
                                        点击右上角<span class="more"></span>,选择<span class="heightlight">发送给朋友</span>
                                    </div>
                                </div>
                            </div>`;
        $('#share').on('click', function (e) {
            e.preventDefault();
            $('body').append(shareHtml);
            $("#_close").click(function () {
                $(this).remove();
            });
        });
    })
    // 播放源滑动组件
    var thisIndex;
    $('.source-select ul').find('li').each(function (index, d) {
        if ($(d).attr('class') == "active") {
            thisIndex = index;
        } else {
            $(d).removeClass("active");
        }
    });
    var swiperList = new Swiper('#tab-list', {
        direction: 'vertical',
        autoplay: false,
        speed: 500,
        initialSlide: thisIndex,
        on: {
            slideChangeTransitionStart: function () {
                $(".source-select ul .active").removeClass('active');
                $(".source-select ul li").eq(this.activeIndex).addClass('active');
            },
        },
    });
    $(".source-select ul li").on('click', function (e) {
        e.preventDefault()
        $(".source-select ul .active").removeClass('active')
        $(this).addClass('active')
        swiperList.slideTo($(this).index())
    });
    //开关
    if (config['detail_ads'] == "1") {
        $('#adDetail').css("display", "block");
    }


});