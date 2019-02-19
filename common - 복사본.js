//main visual basic option
var StormSkin = {
    mainVisualSliderOpt: {
        auto: true,//슬라이드 전환
        mode: 'horizontal',//슬라이드 방향 'horizontal' 정방향, 'vertical' 위아래, 'fade' 바로전환
        controls: false,
        pause: 2000,//속도조절
        autoHover: true,
        adaptiveHeight: true,
        touchEnabled: false,
        useCSS: false//css에서 animate로 바꿈
    }
};

$(document).ready(function () {
    Skin.common.init();
    Skin.main.init();
    Skin.category.init();
    Skin.goods.init();
});
var Skin = {

    // 공통
    common : {
        init : function() {
            Skin.common.popularSearchWord();// 인기검색어
            Skin.common.recentSearchTagOpen();//최근검색어 열기
            Skin.common.recentSearchTagClose();//최근검색어 닫기
            Skin.common.quickSlider();//quick Slider
            Skin.common.wingBanner();//wing banner
            Skin.common.gnbMenu();//gnb menu
            /* newTab*/
            Skin.common.newTab($("ul.tabs li"), $(".tab_content"));//기본탭
            Skin.common.newTab($("ul.skin_tabs li"), $(".skin_tab_content"));//상세탭
            Skin.common.newTab($("ul.faq_tabs li"), $(".faq_tabs_content")); //faq탭
        },
        // 인기검색어
        popularSearchWord: function () {
            $('#ctrl_input_search').on('keydown', function (e) {
                if (e.keyCode === 13) {
                    $('#ctrl_btn_search').trigger('click');
                }
            })
        },

        //최근검색어 열기
        recentSearchTagOpen: function () {
            $("#ctrl_input_search").on('focus', function () {
                $(".recent_search_tag_area").show();
            });
        },

        //최근검색어 닫기
        recentSearchTagClose: function () {
            $("#ctrl_btn_recentSearchWordClose").click(function () {
                $(".recent_search_tag_area").hide();
            });
        },

        //quick Slider
        quickSlider: function () {
            var $quickMenu = $("#quick_menu");
            $quickMenu.animate({ "top": $(document).scrollTop() + 195 + "px" }, 500);
            $(window).scroll(function () {
                $quickMenu.stop();
                $quickMenu.animate({ "top": $(document).scrollTop() + 195 + "px" }, 1000);
            });
            $('.btn_quick_top').click(function () {
                $('html, body').animate({
                    scrollTop: $('body').offset().top
                }, 500);
            });
            var quick_mySlider = $('.quick_view').bxSlider({
                mode: 'vertical',// 가로  방향 수평 슬라이드
                speed: 500,        // 이동 속도를 설정
                pager: false,      // 현재 위치 페이징 표시 여부 설정
                moveSlides: 1,     // 슬라이드 이동시 개수
                slideWidth: 45,   // 슬라이드 너비
                minSlides: 3,      // 최소 노출 개수
                slideMargin: 2,    // 슬라이드간의 간격
                auto: false,        // 자동 실행 여부
                autoHover: true,   // 마우스 호버시 정지 여부
                controls: false,    // 이전 다음 버튼 노출 여부
                infiniteLoop: false,//무한루프여부
                touchEnabled: false,
                //hideControlOnEnd: true //마지막으로 갔을때 이동버튼 삭제
            });
            $('.btn_quick_prev').on('click', function () {
                quick_mySlider.goToPrevSlide();
                return false;
            });
            $('.btn_quick_next').on('click', function () {
                quick_mySlider.goToNextSlide();
                return false;
            });
        },

        //wing banner
        wingBanner: function () {
            var $banner = $("#banner");

            $banner.animate({ "top": $(document).scrollTop() + 195 + "px" }, 500);
            $(window).scroll(function () {
                $banner.stop();
                $banner.animate({ "top": $(document).scrollTop() + 195 + "px" }, 1000);
            });
        },

        //gnb menu
        gnbMenu: function () {
            $('#gnb .btn').click(function () {
                var $this = $(this);
                $this.toggleClass('on');
                if ($this.hasClass('on')) {
                    $('#ctrl_div_gnb2depth').css('display', 'table-row');
                } else {
                    $('#ctrl_div_gnb2depth').css('display', 'none');
                }
                if (!$this.hasClass('on')) {
                    $this.text('열기');
                } else {
                    $this.text('닫기');
                }
            });
        },

        /*   tab   */
        newTab: function ($list, $content) {
            $content.hide().eq(0).show();

            $list.click(function () {
                $list.removeClass("active");
                $(this).addClass("active");
                $content.hide();
                var activeTab = $(this).attr("rel");
                $("#" + activeTab).fadeIn()
            });
        }
    },

    // 메인화면 관련 함수
    main: {
        init : function() {
            Skin.main.mainVisual();//main visual
            Skin.main.bannerSlider($('.main_banner_slide'));// banner slider
            Skin.main.sliderTypeE($("div.list_typeE_area"));// typeESlider
            Skin.main.sliderTypeF($("div.list_typeF_area"));// typeFSlider
        },
        mainVisual: function () {
            var sliderOpt = StormSkin.mainVisualSliderOpt;
            if (StormModule && StormModule.mainVisualSliderOpt) {
                $.extend(sliderOpt, StormModule.mainVisualSliderOpt);
            }

            var mainSlider = $('.main_visual_slider').bxSlider(sliderOpt);
            $('.btn_main_prev').on('click', function () {
                mainSlider.stop().goToPrevSlide();
                return false;
            });
            $('.btn_main_next').on('click', function () {
                mainSlider.stop().goToNextSlide();
                return false;
            });
            if (sliderOpt.auto === true) {
                var $sliderOver = $('.main_visual_slider, .btn_main_prev, .btn_main_next, .bx-pager');
                $sliderOver.mouseenter(function () {
                    mainSlider.stopAuto();
                });
                $sliderOver.mouseleave(function () {
                    mainSlider.startAuto();
                });
            }

            (function pageLoad() {
                var $pager = $('#main_visual.nv_right_cen .bx-wrapper .bx-pager');
                var paHei = $pager.height();
                var paHalf = paHei / 2;
                $pager.css('margin-top', -paHalf);
            })();

            (function setSlider() {
                if(!StormModule || !StormModule.hasOwnProperty('mainVisualSlider')) return;

                var $main_visual = jQuery('#main_visual');

                setNaviBar(StormModule.mainVisualSlider);
                setButton(StormModule.mainVisualSlider);

                function setNaviBar(mainVisualSlider) {
                    // 네비바 설정
                    if (!mainVisualSlider.hasOwnProperty('naviBar')) return;

                    var naviBar = mainVisualSlider.naviBar;

                    if (naviBar.hasOwnProperty('type')) {
                        // 네비바 유형
                        $main_visual.addClass(naviBar.type);
                    }
                    if (naviBar.hasOwnProperty('position')) {
                        // 네비바 위치
                        $main_visual.addClass(naviBar.position);
                    }
                }

                function setButton(mainVisualSlider) {
                    // 네이바 버튼 설정
                    if (!mainVisualSlider.hasOwnProperty('button')) return;

                    var button = mainVisualSlider.button;

                    if (button.hasOwnProperty('type')) {
                        // 버튼 유형
                        $main_visual.addClass(button.type);
                    }
                    if (button.hasOwnProperty('position')) {
                        // 버튼 위치
                        $main_visual.addClass(button.position);
                    }
                }
            })();
        },

        //메인 banner slider
        bannerSlider: function ($sliderdClass) {
            $sliderdClass.find(".banner_slide").bxSlider({
                auto: false,
                slideWidth: 1000,
                pager: true,
                maxSlides: 1,
                moveSlides: 1,
                slideMargin: 0,
                adaptiveHeight: true,
                touchEnabled: false,
                controls: true
            });
        },

        //메인 상품 목록 타입 E(슬라이더형)
        sliderTypeE: function ($sliderdClass) {
            $sliderdClass.find("ul.product_list_typeE").bxSlider({
                auto: false,
                slideWidth: 350,
                pager: false,
                maxSlides: 2,
                moveSlides: 1,
                slideMargin: 30,
                touchEnabled: false,
                controls: false
            });
            $sliderdClass.find(".typeE_btn_prev").on('click', function () {
                $(this).parent().find('ul.product_list_typeE').data('bxSlider').stop().goToPrevSlide();
                return false;
            });
            $sliderdClass.find(".typeE_btn_next").on('click', function () {
                $(this).parent().find('ul.product_list_typeE').data('bxSlider').stop().goToNextSlide();
                return false;
            });
        },

        //메인 상품 목록 타입 F(강조형)
        sliderTypeF: function ($sliderdClass) {
            $sliderdClass.find("ul.product_list_typeF").bxSlider({
                auto: false,
                slideWidth: 350,
                pager: true,
                pagerType: 'short',
                moveSlides: 1,
                touchEnabled: false,
                controls: false,
                onSliderLoad: function (currentIndex) {
                    var $this = $(this);
                    var $items = $this.find('li:not(.bx-clone)');
                    var length = $items.length;
                    var $prevSlide = $items.eq(length - 1);
                    var $nextSlide = $items.eq(currentIndex + 1);
                    var $prevImg = $prevSlide.find('.img_area > a > img').clone();
                    var $nextImg = $nextSlide.find('.img_area > a > img').clone();
                    var $parent = $this.parents('div.list_typeF_area');
                    $parent.find('div.typeF_perv_img').append($prevImg);
                    $parent.find('div.typeF_next_img').append($nextImg);
                },
                onSlideBefore: function ($slideElement, oldIndex, newIndex) {
                    var $this = $(this);
                    var $prevSlide = $slideElement.prev();
                    var $nextSlide = $slideElement.next();
                    var prevImgSrc = $prevSlide.find('.img_area > a > img').attr('src');
                    var nextImgSrc = $nextSlide.find('.img_area > a > img').attr('src');
                    var $parent = $this.parents('div.list_typeF_area');
                    $parent.find('.typeF_perv_img > img').attr('src', prevImgSrc);
                    $parent.find('.typeF_next_img > img').attr('src', nextImgSrc);
                }
            });

            $sliderdClass.find('.bx-has-pager').prepend('( ').append(' )');
            $sliderdClass.find(".typeF_btn_prev").on('click', function () {
                $(this).parent().find('ul.product_list_typeF').data('bxSlider').stop().goToPrevSlide();
                return false;
            });
            $sliderdClass.find(".typeF_btn_next").on('click', function () {
                $(this).parent().find('ul.product_list_typeF').data('bxSlider').stop().goToNextSlide();
                return false;
            });
        }
    },

    // 카테고리
    category: {
        init : function() {
            jQuery('#ctrl_ul_ctgSort li a').on('click', function() {
                var $this = $(this),
                    $form = jQuery('#form_id_search');
                $this.parent().siblings().find('a').removeClass('selected');
                $this.addClass('selected');
                $form.find('input[name="sortType"]').val($this.data('code'));
                $form.submit();

                return false;
            });
            jQuery('#ctrl_ul_ctgView li > span').on('click', function() {
                var $this = $(this),
                    $form = jQuery('#form_id_search');

                if($this.hasClass('icon_view_image')) {
                    $form.find('input[name="displayTypeCd"]').val('IMAGE');
                } else {
                    $form.find('input[name="displayTypeCd"]').val('LIST');
                }
                $form.submit();
            });
            jQuery('#ctrl_select_ctgRows').on('change', function() {
                var $this = $(this),
                    $form = jQuery('#form_id_search');
                $form.find('input[name="rows"]').val($this.find('option:selected').val());
                $form.submit();

                return false;
            });
        }
    },

    // 상품
    goods: {
        init : function () {
            Skin.goods.goodsImage(); // 상품 이미지 오버
            Skin.goods.resTock();//재입고 알림
            Skin.goods.detailSlider();//상품 상세 슬라이드
            //관련상품
            Skin.goods.withSlider($('#with_item .product_list_typeA'), 490, 20, 2);//2단
            Skin.goods.withSlider($('#with_item .product_list_typeB'), 300, 50, 3);//3단
            Skin.goods.withSlider($('#with_item .product_list_typeC'), 240, 13, 4);//4단
            Skin.goods.withSlider($('#with_item .product_list_typeD'), 180, 25, 5);//5단
        },

        // 상품 이미지 레이어 메뉴
        goodsImage: function () {
            $("div.img_area").mouseover(function () {
                $(this).children('.img_menu').stop().fadeIn('slow');
            });
            $("div.img_area").mouseleave(function () {
                $(this).children('.img_menu').stop().fadeOut();
            });
            Skin.goods.preview();
            Skin.goods.basket();
            Skin.goods.interest();
        },

        // 상품 이미지 레이어 메뉴 - 프리뷰
        preview: function () {
            jQuery('.img_menu > button.btn01').on('click', function () {
                goods_preview(jQuery(this).parents('li').data('goodsNo'));
            });

            // 상품이미지 미리보기 닫기
            jQuery(document).on('click', '#goodsPreview button.btn_close_popup', function () {
                close_goods_preview();
            });

            //상품이미지 미리보기
            function goods_preview(goodsNo) {
                var seq = new Date().format('yyyyMMddHHmmss');
                var param = 'goodsNo=' + goodsNo + "&seq=" + seq;
                var url = '/front/goods/goodsImagePreview.do?' + param;
                Storm.AjaxUtil.load(url, function (result) {
                    setTimeout(function () { $('#goodsPreview').html(result); }, 500);
                    Storm.LayerPopupUtil.open($("#div_goodsPreview"));
                })
            }

            function close_goods_preview() {
                $("#p_goods_view_slider").html("");//미리보기초기화
                $("#p_goods_view_s_slider").html("");//슬라이드초기화
                Storm.LayerPopupUtil.close("div_goodsPreview");
            }
        },

        // 상품 이미지 레이어 메뉴 - 장바구니
        basket : function() {
            jQuery('.img_menu > button.btn02').on('click', function() {
                ListBtnUtil.insertBasket(jQuery(this).parents('li').data('goodsNo'));
            });
        },
        // 상품 이미지 레이어 메뉴 - 관심상품
        interest : function() {
            jQuery('.img_menu > button.btn03').on('click', function() {
                ListBtnUtil.insertInterest(jQuery(this).parents('li').data('goodsNo'));
            });
        },

        /* 재입고 알림 */
        resTock: function () {
            $("#btn_alarm_view").hover(function () {
                $(".alarm_view_layer").toggle();
            });
        },

        //상품 상세 슬라이드
        detailSlider: function () {
            var $gvSs = $('#goods_view_s_slider');
            var $prPh = $('#product_photo');
            $gvSs.bxSlider({
                slideWidth: 91,
                minSlides: 2,
                maxSlides: 5,
                moveSlides: 1,
                slideMargin: 10,
                touchEnabled: false,
                infiniteLoop: false,
                pager: false
            });
            var sliderAlen = $gvSs.find('button.bx-clone').length;
            if ($gvSs.find("button").length - sliderAlen < 5) {
                $prPh.find(".bx-wrapper").css({
                    'margin': '0'
                });
                $prPh.find(".bx-next").hide();
                $prPh.find(".bx-prev").hide();
            }
            var $detailSlider = $('.goods_view_slider').bxSlider({
                captions: true,
                controls: false,
                touchEnabled: false,
                pager: false
            });

            $gvSs.find('button').on('click', function() {
                var position = parseInt($(this).data('slide-index'));//data-slide-index 값
                $detailSlider.goToSlide(position);//제공된 슬라이드 인덱스(0부터 시작)로 슬라이드 전환을 수행합니다.
            });
        },

        //관련상품
        withSlider: function ($slideClass, swNum, smNum, maxNum, $withType) {
            $slideClass.bxSlider({
                pager: false,
                slideWidth: swNum,
                slideMargin: smNum,
                infiniteLoop: false,
                moveSlides: 1,
                minSlides: 1,
                maxSlides: maxNum,
                touchEnabled: false,
                auto: false
            });
        }
    }
};