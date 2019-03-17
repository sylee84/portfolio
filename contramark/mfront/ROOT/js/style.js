    /* 상품 결제수단 탭 */
    $(document).ready(function() {
        $('.radio_chack1_a').on('click', function(){
            $(this).siblings('div.radio1_con_a').hide();
            $(this).siblings('div.radio1_con_b').hide();
        })
        $('.radio_chack1_b').on('click', function(){
            $(this).siblings('div.radio1_con_a').hide();
            $(this).parents('span').siblings('div.radio1_con_b').hide();
        })
        $('.radio_chack1_c').on('click', function(){
            $(this).siblings('div.radio1_con_b').show();
            $(this).siblings('div.radio1_con_a').hide();
        })

        $('.radio_chack2_a').on('click', function(){
            $(this).parents().siblings('tr[class^="radio2_con"]').hide();
            $('tr.radio2_con_a').show();
        })
        $('.radio_chack2_b').on('click', function(){
            $(this).parents().siblings('tr[class^="radio2_con"]').hide();
            $('tr.radio2_con_b').show();
        })
        $('.radio_chack2_c').on('click', function(){
            $(this).parents().siblings('tr[class^="radio2_con"]').hide();
            $('tr.radio2_con_c').show();
        })
        $('.radio_chack2_d').on('click', function(){
            $(this).parents().siblings('tr[class^="radio2_con"]').hide();
            $('tr.radio2_con_d').show();
        })
        $('.radio_chack2_e').on('click', function(){
            $(this).parents().siblings('tr[class^="radio2_con"]').hide();
            $('tr.radio2_con_e').show();
        })
        $('.radio_chack2_f').on('click', function(){
            $(this).parents().siblings('tr[class^="radio2_con"]').hide();
            $('tr.radio2_con_f').show();
        })
        $('.radio_chack2_g').on('click', function(){
            $(this).parents().siblings('tr[class^="radio2_con"]').hide();
            $('tr.radio2_con_g').show();
        })
    });


/*********************************************************/

    /* === 리스트 선택 메뉴 selectbox === */
    $(document).ready(function() {
        enableSelectBoxes_score();
    });

    function enableSelectBoxes_score(){
        $('div.list_selectBox').each(function(){
            $(this).children('span.selected').html($(this).children('div.selectOptions').children('span.selectOption:first').html());
            $(this).attr('value',$(this).children('div.selectOptions').children('span.selectOption:first').attr('value'));

            $(this).children('span.selected,span.selectArrow').click(function(){
                if($(this).parent().children('div.selectOptions').css('display') == 'none'){
                    $(this).parent().children('div.selectOptions').css('display','block');
                }
                else
                {
                    $(this).parent().children('div.selectOptions').css('display','none');
                }
            });

            $(this).find('span.selectOption').click(function(){
                $(this).parent().css('display','none');
                $(this).closest('div.selectBox').attr('value',$(this).attr('value'));
                $(this).parent().siblings('span.selected').data('value', $(this).attr('value'));
                $(this).parent().siblings('span.selected').html($(this).html());
            });
        });
    }

    $(function () {
        /*$("#list_view").hide();
        $(this).find('span#selectOption_list').click(function(){
            $('#image_view').hide();
            $('#list_view').show();
        });
        $(this).find('span#selectOption_image').click(function(){
            $('#image_view').show();
            $('#list_view').hide();
        })*/;
    });

    /* === 좋아요 버튼 === */
    $(function () {
        $(".btn_check_like").click(function () {
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
            $(this).addClass('active');}
        });
    });
    /* === sns 버튼 === */
    $(function () {
        $('.btn_sns_area').hide();
        $(".btn_view_sns").click(function () {
            $('.btn_sns_area').show();
        });
        $( ".btn_sns" ).click(function() {
            $(".btn_sns_area" ).hide();
            return false;
        });
    });

    /* === selectbox option 선택 === */
     $(document).ready(function() {
        $('.product_option_list').hide();

        $("#goods_option_select01").change(function() {
          var selected = $("#goods_option_select01 option:selected").val() ;
          $('#goods_option_01_view').show();
          $('.product_option_list').addClass('product_option_list_line');
        });
        $("#goods_option_select02").change(function() {
          var selected = $("#goods_option_select02 option:selected").val() ;
          $('#goods_option_02_view').show();
          $('.product_option_list').addClass('product_option_list_line');
        });
        $("#goods_option_select03").change(function() {
          var selected = $("#goods_option_select03 option:selected").val() ;
          $('#goods_option_03_view').show();
          $('.product_option_list').addClass('product_option_list_line');
        });
    });


    /* === row 삭제 === */
    function deleteLine(obj) {
        var row = $(obj).parents().parents().parents('.product_option_list');
        var comment = $(obj).parents().parents().parents('.comment_view');

        //라인 삭제
        row.remove();
        row2.remove();
        comment.remove();
    }

    /* === review 보기 === */
    $(function () {
        $( ".review_view_text" ).hide();
        $( ".review_list" ).on('click','.review_view_title',function() {
            $(".review_view_text:visible" ).slideUp("middle");
            $(this).next(".review_view_text:hidden" ).slideDown("middle");
            return false;
        })
    });

    /* === 상품문의 보기 === */
    $(function () {
        $( ".qna_view_text" ).hide();
        $( ".qna_list" ).on('click','.qna_view_title',function() {
            $(".qna_view_text:visible").slideUp("middle");
            $(this).next('.qna_view_text:hidden').slideDown("middle");
            return false;
        })
    });




    /* === notice === */
    $(function () {
        $( ".notice_view_text" ).hide();
        $(document).on('click','.notice_view_title',function() {
            $(".notice_view_text:visible").slideUp("middle");
            $(this).next('.notice_view_text:hidden').slideDown("middle");
            return false;
        })
    });

    /* === 자주묻는 질문 === */
    $(function(){
        $(".faq_anwser_view").hide();
        $(document).on('click','.faq_title',function() {
            $(".faq_anwser_view:visible").slideUp("middle");
            $(this).next('.faq_anwser_view:hidden').slideDown("middle");
            return false;
        })
    });
    $(function () {
        $( "div.faq_content" ).hide();
        $( "div.faq_content:first" ).show();

        $("ul.faq_menu li").click(function () {
            $("ul.faq_menu li").removeClass("active");
            $(this).addClass("active");
            $("div.faq_content").hide()
            var activeTab = $(this).attr("rel");
            $("#" + activeTab).fadeIn()
        });
    });

    /* === 로그인 === */
    $(function () {
        $( "div.login_content" ).hide();
        $( "div.login_content:first" ).show();

        $("ul.login_menu li").click(function () {
            $("ul.login_menu li").removeClass("active");
            $(this).addClass("active");
            $("div.login_content").hide()
            var activeTab = $(this).attr("rel");
            $("#" + activeTab).fadeIn()
        });
    });

    /* === 비밀번호 찾기 === */
     $(document).ready(function() {
        /*$('.auth_email_form').hide();

        $("#pw_auth_select01").change(function() {
          var checked = $("#goods_option_select01 option:checked").val() ;
          $(".auth_email_form").hide();
          $(".auth_id_form").show();
        });
        $("#pw_auth_select02").change(function() {
          var checked = $("#goods_option_select02 option:checked").val() ;
          $(".auth_email_form").hide();
          $(".auth_id_form").show();
        });
        $("#pw_auth_select03").change(function() {
          var checked = $("#goods_option_select03 option:checked").val() ;
          $(".auth_email_form").show();
          $(".auth_id_form").hide();
        });*/
    });

    /* === 신규배송지 === */
     $(document).ready(function() {
        $('.new_address_form').hide();

        $("#address_select03").change(function() {
          var checked = $("#address_select03 option:checked").val() ;
          $(".new_address_form").show();
        });
        $("#address_select01").change(function() {
          var checked = $("#address_select01 option:checked").val() ;
          $(".new_address_form").hide();
        });
        $("#address_select02").change(function() {
          var checked = $("#address_select02 option:checked").val() ;
          $(".new_address_form").hide();
        });
    });

    /* === mypage bottom menu === */
    $(function () {
        $( ".mypage_smenu" ).hide();
        $(".mypage_menu a").click(function () {
            if($(this).hasClass('active')){
                $(this).parents().next( ".mypage_smenu" ).hide();
                $(this).removeClass('active');

            }else{
                $(this).parents().next( ".mypage_smenu" ).show();
                $(this).addClass('active');
            }
            //$(this).parents().next( ".mypage_smenu" ).slideToggle( "middle");
            //$('html, body').animate({ scrollTop: $(document).height() }, 5000);
        });
    });

    /* === mypage 주문상세 === */
    $(function () {
        $( "div.my_order_content" ).hide();
        $( "div.my_order_content:first" ).show();
        $("ul.my_order_menu li").click(function () {
            $("ul.my_order_menu li").removeClass("active");
            $(this).addClass("active");
            $("div.my_order_content").hide()
            var activeTab = $(this).attr("rel");
            $("#" + activeTab).fadeIn()
        });
    });

    /* === 회원가입 약관 === */
    $(function () {
        $( "div.rules_area" ).hide();
        $(".btn_view_rules").click(function () {
            if($(this).children('span').hasClass('active')){
                $(this).children('span').removeClass('active');
            }else{
                $(this).children('span').addClass('active');}
            $(this).next("div.rules_area").slideToggle('middle')
        });
    });


    /* === popup coupon === */
    $(document).ready(function() {
        /*$("#btn").click(function(){
            $.blockUI({
                message:$('#popup_coupon_select')
                ,css:{
                    width:     '100%',
                    position:  'fixed',
                    top:       '50px',
                    left:      '0',
                }
                ,onOverlayClick: $.unblockUI
            });
        });*/
        $(".closepopup").click(function(){
            $.unblockUI();
        });
    });

    /* === alret agree === */
    $(document).ready(function() {
        /*$("#btn_agree").click(function(){

            $.blockUI({
                message:$('#popup_agress_alert')
                ,css:{
                    width:     '100%',
                    height:    '200px',
                    position:  'fixed',
                    top:       '50px',
                    left:      '0',
                }
                ,onOverlayClick: $.unblockUI
            });
        });*/
        $(".closepopup").click(function(){
            $.unblockUI();
        });
    });

    /* === popup post === */
    $(document).ready(function() {
        /*$(".btn_post").click(function(){

        });*/
        $(".closepopup").click(function(){
            $.unblockUI();
        });
    });

    /* === menu all_gnb === */
    $(function () {
        $( ".site_nav_list_s" ).hide();
        $(".site_nav_list > span").click(function () {
            if($(this).hasClass('active')){
                $(this).removeClass('active');
            }else{
                $(this).addClass('active');}
            $(this).parents().next( ".site_nav_list_s" ).slideToggle( "slow");
        });
    });
    $(function () {
        $( ".site_gnb_list_s" ).hide();
        $(".site_gnb_list > span").click(function () {
            if($(this).hasClass('active')){
                $(this).removeClass('active');
            }else{
                $(this).addClass('active');}
            $(this).parents().next( ".site_gnb_list_s" ).slideToggle( "slow");
        });
    });

    /* === search area === */
    $(function () {
        $( "#search_area" ).hide();
        $(".btn_search_view").click(function () {
            $("#search_area").slideToggle( "800");
        });
    });

    /* === go to top  버튼 위치변경 === */
    $(window).scroll(function(){
        if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            $('#toTop').css('position','fixed');
            $('#toTop').css('bottom','10px');
            $('.f_go_top').css('display','none');
        }else{
            $('#toTop').css('position','fixed');
            $('#toTop').css('bottom','10px');
        }
    });

    $(function () {
        $('.btn_go_prev').off('click').on('click',function(){
            history.back();
        });
    });

    /* === 카테고리 선택 select box === */
    $(function () {
        $('#selCategoryHead').on('change',function(){
            var ctgNo = $(this).find("option:selected").val();
            if(ctgNo != '') {
                move_category(ctgNo);
            }
        });
    });
    /* === 카테고리 검색조건 select box === */
    $(document).ready(function() {
        enableCategorySelectBoxes();
    });
    function enableCategorySelectBoxes(){
        $('div.list_selectBox').each(function(){
            var $selectedOption = $(this).children('div.selectOptions').children('span.selectOption.selected');
            if($selectedOption == null){
                $selectedOption = $(this).children('div.selectOptions').children('span.selectOption:first');
            }
            $(this).children('span.selected').html($selectedOption.html());
            $(this).attr('value',$selectedOption.attr('value'));

            $(this).off('click').on('click', function(){
                if($(this).parent().children('div.selectOptions').css('display') == 'none'){
                    $(this).parent().children('div.selectOptions').css('display','block');
                }
                else
                {
                    $(this).parent().children('div.selectOptions').css('display','none');
                }
            });

            $(this).find('span.selectOption').off('click').on('click', function(){
                $(this).parent().css('display','none');
                $(this).closest('div.selectBox').attr('value',$(this).attr('value'));
                $(this).parent().siblings('span.selected').html($(this).html());
            });

            $selectedOption.removeClass('selected');
        });
    }

    // ================================== 신규 ==============================================
    $(document).ready(function(){
        // 메인 스와이프
        var touchEnabled = false;
        var mainImgLength = $('#main_visual li').length;
        if(mainImgLength > 1) {
            touchEnabled = true;
            $('.main_visual_prev').show();
            $('.main_visual_next').show();
        }
        var mainswiper = new Swiper('#main_visual', {
            mode: 'horizontal',
            pagination:false,
            nextButton: '.main_visual_next',
            prevButton: '.main_visual_prev',
            slidesPerView: 1,
            touchMoveStopPropagation:false,
            paginationClickable: true,
            loop: touchEnabled
        });

        // typeA 스와이프
        var maintypeA = new Swiper('#main_typeA_con', {
            mode: 'horizontal',
            pagination:false,
            nextButton: '.main_typeA_next',
            prevButton: '.main_typeA_prev',
            slidesPerView: 1,
            spaceBetween: 40+ '%',
            touchMoveStopPropagation:false,
            paginationClickable: true,
            loop: touchEnabled
        });

        // typeF 스와이프
        var maintypeA = new Swiper('#main_typeF_swiper', {
            mode: 'horizontal',
            pagination:false,
            nextButton: '.main_typeF_next',
            prevButton: '.main_typeF_prev',
            pagination: '.pagination',
            slidesPerView: 1,
            spaceBetween: 40+ '%',
            touchMoveStopPropagation:false,
            paginationClickable: true,
            loop: touchEnabled,
            onSlideChangeStart: function(swiper) {
                $('ul[id^="recipeGoods_"]').hide();
                $('#recipeGoods_'+swiper.realIndex).fadeIn();
            }
        });
    });

    //탑 버튼
    $(document).ready(function() {
        $().UItoTop({ easingType: 'easeOutQuart' });
    });

    $(document).ready(function() {
        $(".gnb_tab_menu_con").hide();
        $(".gnb_tab_menu_con:first").show();

        $("ul.gnb_tab_menu li").click(function () {
            $("ul.gnb_tab_menu li").removeClass("active");
            $(this).addClass("active");
            $(".gnb_tab_menu_con").hide()
            var activeTab = $(this).attr("rel");
            $("#" + activeTab).fadeIn()
        });
    });

    //typeC 텝
    $(document).ready(function() {
        $(".main_typeC_tab_con").hide();
        $(".main_typeC_tab_con:first").show();

        $(".main_typeC_tab li").click(function () {
            $(".main_typeC_tab li").removeClass("active");
            $(this).addClass("active");
            $(".main_typeC_tab_con").hide()
            var activeTab = $(this).attr("rel");
            $("#" + activeTab).fadeIn()
        });
    });

    //typeE 텝
    $(document).ready(function() {
        $(".main_typeE_tab_con").hide();
        $(".main_typeE_tab_con:first").show();

        $(".main_typeE_tab li").click(function () {
            $(".main_typeE_tab li").removeClass("active");
            $(this).addClass("active");
            $(".main_typeE_tab_con").hide()
            var activeTab = $(this).attr("rel");
            $("#" + activeTab).fadeIn()
        });
    });


