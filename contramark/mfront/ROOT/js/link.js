jQuery(document).ready(function(){
    //상단 네비게이션 이동 함수 setting
    $("[id^=navigation_combo_]").on("change",function(){
        move_category(this.value);
    })
    // 페이지당 상품 조회수량 변경
    $("#view_count").on("change",function(){
        change_view_count();
    })
    //이전으로 가기
    $(".btn_prev_page").on("click",function (){
        history.back();
    });

    //장바구니 팝업 닫기
    $('#btn_close_pop').on('click', function(){
        Storm.LayerPopupUtil.close('success_basket');
    });

    //장바구니이동
    $('#btn_move_basket').on('click', function(){
        location.href = MOBILE_CONTEXT_PATH+"/front/basket/basketList.do";
    });

    //sns부가정보입력 팝업여부
    if( sns_add_info_Yn == "Y"){

        var target = MOBILE_CONTEXT_PATH+"/front/login/snsAddInfoPop.do";
       popup =  window.open('about:blank', "SNS부가정보 입력","width=700,height=600", false);


       popup.location =target;
    }

    //TOP BOTTON 클릭시 상단으로이동
    $('.btn_quick_top').click(function(){
        $('html, body').animate({scrollTop:0},400);
        return false;
    });

    // 상단 상품검색
    $('#btn_search').on('click',function(){
        if($('#searchText').val() === '') {
            Storm.LayerUtil.alert("입력된 검색어가 없습니다.", "알림");
            return false;
        }
        var param = {searchType:'1',searchWord : $("#searchText").val()}
        Storm.FormUtil.submit(MOBILE_CONTEXT_PATH+'/front/search/goodsSearch.do', param);
    });

    // top-menu-cart
    $('#move_cart').on('click',function(){
        location.href = MOBILE_CONTEXT_PATH+"/front/basket/basketList.do"
    });
    // top-menu-order/delivery
    $('#move_order').on('click',function(){
        if(loginYn) {
            location.href = MOBILE_CONTEXT_PATH+"/front/order/orderList.do";
        }else{
            Storm.LayerUtil.confirm("로그인이 필요한 서비스입니다. 지금 로그인 하시겠습니까?",
                //확인버튼 클릭, 확인시 로그인페이로 이동하는등의 동작이 필요
                function() {
                    location.href= MOBILE_CONTEXT_PATH+"/front/login/viewLogin.do"
                },'');
        }
    });
    //top-menu-mypage
    $('#move_mypage').on('click',function(){
        if(loginYn) {
            location.href = MOBILE_CONTEXT_PATH+"/front/member/mypage.do";
        }else{
            Storm.LayerUtil.confirm("로그인이 필요한 서비스입니다. 지금 로그인 하시겠습니까?",
                //확인버튼 클릭, 확인시 로그인페이로 이동하는등의 동작이 필요
                function() {
                    location.href= MOBILE_CONTEXT_PATH+"/front/login/viewLogin.do?returnUrl="+MOBILE_CONTEXT_PATH+"/front/member/mypage.do"
                },'');
        }
    });

    //장바구니 수량 조회
    reLoadQuickCnt();

    $(document).ready(function() {
        //커뮤니티 셀렉트 박스
        $('#communitySelectBox').on('change', function() {
            move_page($(this).find(":selected").val());
        });
    });
});

//장바구니이동
function move_basket(){
    location.href = MOBILE_CONTEXT_PATH+"/front/basket/basketList.do"
}
//공지사항이동
function move_notice(){
    location.href = MOBILE_CONTEXT_PATH+"/front/customer/noticeList.do";
}
// 주문내역이동
function move_order(){
    if(loginYn) {
        location.href = MOBILE_CONTEXT_PATH+"/front/order/orderList.do";
    }else{
        Storm.LayerUtil.confirm("로그인이 필요한 서비스입니다. 지금 로그인 하시겠습니까?",
            //확인버튼 클릭, 확인시 로그인페이로 이동하는등의 동작이 필요
            function() {
                location.href= MOBILE_CONTEXT_PATH+"/front/login/viewLogin.do"
            },'');
    }
}
//관심상품이동
function move_interest(){
    if(loginYn) {
        location.href = MOBILE_CONTEXT_PATH+"/front/interest/interestList.do";
    }else{
        Storm.LayerUtil.confirm("로그인이 필요한 서비스입니다. 지금 로그인 하시겠습니까?",
        function() {
            location.href= MOBILE_CONTEXT_PATH+"/front/login/viewLogin.do"
        },'');
    }
}
//마이페이지 이동
function move_mypage(){
    if(loginYn) {
        location.href = MOBILE_CONTEXT_PATH+"/front/member/mypage.do";
    }else{
        Storm.LayerUtil.confirm("로그인이 필요한 서비스입니다. 지금 로그인 하시겠습니까?",
            //확인버튼 클릭, 확인시 로그인페이로 이동하는등의 동작이 필요
            function() {
                location.href= MOBILE_CONTEXT_PATH+"/front/login/viewLogin.do"
            },'');
    }
}

//장바구니,관심상품카운트 조회
function reLoadQuickCnt(){
    var url = MOBILE_CONTEXT_PATH+'/front/member/selectQuickInfo.do';
    Storm.AjaxUtil.getJSON(url, '', function(result) {
        if(result && result.success) {
            $("#basket_count").html(result.data.basketCnt);//장바구니갯수
        }
    });
}

//즐겨찾기 추가
function add_favorite(){
    var url = location.href;
    if (window.sidebar && window.sidebar.addPanel){ // Mozilla Firefox
        window.sidebar.addPanel(siteNm, url, "");
    }else if(window.opera && window.print) { // Opera
        var elem = document.createElement('a');
        elem.setAttribute('href',url);
        elem.setAttribute('title',siteNm);
        elem.setAttribute('rel','sidebar');
        elem.click();
    }else if(window.external && document.all){ // ie
        window.external.AddFavorite(url,siteNm);
    }else if((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))){ // ie11
        window.external.AddFavorite(url, siteNm);
    }else{ // crome safari
        alert("Ctrl+D키를 누르시면 즐겨찾기에 추가하실 수 있습니다.");
    }
}
// 출석체크이벤트이동
function viewAttendance() {
    Storm.FormUtil.submit(MOBILE_CONTEXT_PATH+'/front/event/viewAttendanceCheck.do');
}
//인기검색어조회
function keywordSearch(keyword){
    $("#searchText").val(keyword);
    var param = {searchWord : $("#searchText").val()}
    Storm.FormUtil.submit(MOBILE_CONTEXT_PATH+'/front/search/goodsSearch.do', param);
}
/******************************************************************************
**  페이징이동 관련함수
*******************************************************************************/
// 카테고리 이동
function move_category(no) {
    location.href = MOBILE_CONTEXT_PATH+"/front/search/categorySearch.do?ctgNo="+no;
}

function move_order_detail(no) {
    location.href = MOBILE_CONTEXT_PATH+"/front/order/orderDetail.do?ordNo="+no;
}


// 페이지 이동
function move_page(idx){
    if(idx == 'faq'){ // FAQ 목록페이지
        location.href = MOBILE_CONTEXT_PATH+"/front/customer/faqList.do";
    }else if (idx == 'notice'){ // 공지사항 목록페이지
        location.href = MOBILE_CONTEXT_PATH+"/front/customer/noticeList.do";
    }else if (idx == 'inquiry'){ // 마이페이지-상품문의목록페이지
        if(loginYn) {
            location.href = MOBILE_CONTEXT_PATH+"/front/customer/inquiryList.do";
        }else{
            Storm.LayerUtil.confirm("로그인이 필요한 서비스입니다. 지금 로그인 하시겠습니까?",function() {location.href= MOBILE_CONTEXT_PATH+"/front/login/viewLogin.do"},'');
        }
    }else if(idx == 'login'){ //로그인페이지
        location.href = MOBILE_CONTEXT_PATH+"/front/login/viewLogin.do";
    }else if(idx == 'main'){ //메인페이지
        location.href = MOBILE_CONTEXT_PATH+"/front/viewMain.do";
    }else if(idx == 'customer'){ //고객행복센터
        location.href = "/front/customer/customerMain.do";
    }else if(idx == 'mypage'){ //마이페이지
        if(loginYn){
            location.href = MOBILE_CONTEXT_PATH+"/front/member/mypage.do";
        }else{
            Storm.LayerUtil.confirm("로그인이 필요한 서비스입니다. 지금 로그인 하시겠습니까?",function() {location.href= MOBILE_CONTEXT_PATH+"/front/login/viewLogin.do"},'');
        }
    }else if(idx == 'id_search'){ //아이디찾기 페이지
        location.href = MOBILE_CONTEXT_PATH+"/front/login/accountSearch.do?mode=id";
    }else if(idx == 'pass_search'){ //비밀번호찾기 페이지
        location.href = MOBILE_CONTEXT_PATH+"/front/login/accountSearch.do?mode=pass";
    }else if(idx == 'order'){ //주문내역조회 페이지
        if(loginYn){
            location.href = MOBILE_CONTEXT_PATH+"/front/order/orderList.do";
        }else{
            Storm.LayerUtil.confirm("로그인이 필요한 서비스입니다. 지금 로그인 하시겠습니까?",function() {location.href= MOBILE_CONTEXT_PATH+"/front/login/viewLogin.do"},'');
        }
    }else if(idx == 'interest'){ //관심항목 페이지
        location.href = MOBILE_CONTEXT_PATH+"/front/interest/interestList.do";
    }else if(idx == 'basket'){ //장바구니 페이지
        location.href = MOBILE_CONTEXT_PATH+"/front/basket/basketList.do";
    }else if(idx == 'community'){ //커뮤니티 페이지
        location.href = MOBILE_CONTEXT_PATH+"/front/community/recipeList.do";
    }else if(idx == 'event'){ //이벤트 페이지
        location.href = MOBILE_CONTEXT_PATH+"/front/event/eventList.do";
    }else if(idx == 'promotionList'){ //기획전 이동
        location.href = MOBILE_CONTEXT_PATH+"/front/promotion/promotionList.do";
    }else if(idx == 'massEstimate'){ //대량 견적
        location.href = MOBILE_CONTEXT_PATH+"/front/massestimate/massEstimateGoodsList.do";
    }else if(idx == 'recipe'){ //레시피 페이지 이동
        location.href = MOBILE_CONTEXT_PATH+"/front/community/recipeList.do";
    }else if(idx == 'seminar'){ //세미나 페이지 이동
        location.href = MOBILE_CONTEXT_PATH+'/front/community/seminarList.do';
    }else if(idx == 'buyer'){ //베스트바이어 페이지 이동
        location.href = MOBILE_CONTEXT_PATH+'/front/community/buyerList.do';
    }else if(idx == 'story'){ //창업스토리 페이지 이동
        location.href = MOBILE_CONTEXT_PATH+'/front/community/storyList.do';
    }else if(idx == 'noticePartner'){ //사장님들보세요 페이지 이동
        //location.href = MOBILE_CONTEXT_PATH+'/front/community/noticePartnerList.do';
        location.href = MOBILE_CONTEXT_PATH+"/front/massestimate/massEstimateGoodsList.do";
    }else if(idx == 'cooking'){ //요리비법 페이지 이동
        //location.href = MOBILE_CONTEXT_PATH+'/front/community/cookingList.do';
        location.href = MOBILE_CONTEXT_PATH+"/front/community/recipeList.do";
    }else if(idx == 'seminarVideo'){ //지난동영상
        location.href = MOBILE_CONTEXT_PATH+"/front/community/seminarVideoList.do";
    }else if(idx == 'company'){ //회사소개 페이지
        location.href = MOBILE_CONTEXT_PATH+"/front/company.do?siteInfoCd=01";
    }else if(idx == 'agreement'){ //이용약관 페이지
        location.href = MOBILE_CONTEXT_PATH+"/front/company.do?siteInfoCd=03";
    }else if(idx == 'privacy'){ //개인정보취급방침 페이지
        location.href = MOBILE_CONTEXT_PATH+"/front/company.do?siteInfoCd=04";
    }else{
        alert("페이지경로가 정상적이지 않습니다.")
    }
}

//커뮤니티 상세 페이지 이동
function move_community(bbsId, num) {
    /*
     * 햇쌀마루 커뮤니티
     * 레시피 : recipe
     * 세미나 : seminar
     * 베스트바이어 : buyer
     * 맛집 발견 : story
     * 대리점 소개 : partner
     * 사장님들 보세요 : noticePartner
     * 레시피 : cooking
     */
    if(bbsId == 'recipe') {
        location.href = MOBILE_CONTEXT_PATH+'/front/community/recipeView.do?recipeNo='+num;
    } else if(bbsId == 'seminar') {
        location.href = MOBILE_CONTEXT_PATH+'/front/community/viewSeminar.do?seminarNo='+num;
    } else if(bbsId == 'buyer') {
        location.href = MOBILE_CONTEXT_PATH+'/front/community/bestView.do?bestNo='+num;
    } else if(bbsId == 'story') {
        location.href = MOBILE_CONTEXT_PATH+'/front/community/storyView.do?storyNo='+num;
    } else if(bbsId == 'noticePartner') {
        location.href = MOBILE_CONTEXT_PATH+'/front/community/noticePartnerView.do?lettNo='+num;
    } else if(bbsId == 'cooking') {
        location.href = MOBILE_CONTEXT_PATH+'/front/community/cookingView.do?recipeNo='+num;
    } else {
        alert("페이지경로가 정상적이지 않습니다.")
    }
}

//로그아웃
function logout(){
    Storm.FormUtil.submit(MOBILE_CONTEXT_PATH+'/front/login/logout.do', {});
}
/******************************************************************************
** 카테고리검색 관련함수
*******************************************************************************/
//노출상품갯수변경
function change_view_count(){
    $('#rows').val($('#view_count option:selected').val());
    if('${so.rows}' != $('#rows').val()){
        if($('#searchType').val() == undefined || $('#searchType').val() == ''){
            category_search();
        }else{
            goods_search()
        }
    }
}
// 카테고리검색 전시타입변경
function change_dispType(type){
    $('#displayTypeCd').val(type);
    if($('#searchType').val() == undefined || $('#searchType').val() == ''){
        category_search();
    }else{
        if($('#searchType').val() == '0'){
            alert("검색조건을 선택하세요.")
        }else{
            goods_search();
        }
    }
}
// 카테고리검색 정렬기준 변경
function change_sort(type){
    $('#sortType').val(type);
    if($('#searchType').val() == undefined || $('#searchType').val() == ''){
        category_search();
    }else{
        goods_search()
    }
}
// 카테고리상품검색
function category_search(){
    $('#form_id_search').attr("method",'POST');
    $('#form_id_search').attr("action",MOBILE_CONTEXT_PATH+'/front/search/categorySearch.do')
    $('#form_id_search').submit();
}

/******************************************************************************
** 상품검색 관련함수
*******************************************************************************/

// 상품검색
function goods_search(){
    $('#form_id_search').attr("action",MOBILE_CONTEXT_PATH+'/front/search/goodsSearch.do')
    $('#form_id_search').submit();
}

// 상품상세페이지 이동
function goods_detail(idx){
    location.href = MOBILE_CONTEXT_PATH+"/front/goods/goodsDetail.do?goodsNo="+idx;
}

// 상품이미지 미리보기
function goods_preview(goodsNo){
    var param = 'goodsNo='+goodsNo;
    var url = MOBILE_CONTEXT_PATH+'/front/goods/goodsImagePreview.do?'+param;
    Storm.AjaxUtil.load(url, function(result) {
        $('#goodsPreview').html(result);
        Storm.LayerPopupUtil.open($("#div_goodsPreview"));
    })
}
// 상품이미지 미리보기 닫기
function close_goods_preview(){
    Storm.LayerPopupUtil.close("div_goodsPreview");
}

//교환팝업
function order_exchange_pop(no){
    var url = MOBILE_CONTEXT_PATH+'/front/order/orderExchangePop.do?ordNo='+no;
    location.href=url;
    //모바일에선 화면이동
    /*Storm.AjaxUtil.load(url, function(result) {
        $('#popup_my_order_replace').html(result);
        Storm.LayerPopupUtil.open($("#div_order_exchange"));
    })*/
}
//교환신청
function claim_exchange(){

        var url = MOBILE_CONTEXT_PATH+'/front/order/claimExchange.do'
        , param = {}
        , ordNoArr = ""
        , ordDtlSeqArr = ""
        , claimReasonCdArr = "";

        var comma = ',';
        var chkItem = $('input:checkbox[name=itemNoArr]:checked').length;

        if(chkItem == 0){
            Storm.LayerUtil.alert('교환신청할 상품을 선택해 주십시요');
            return;
        }

        Storm.LayerUtil.confirm('교환신청 하시겠습니까?', function() {
        $('input:checkbox[name=itemNoArr]:checked').each(function(i) {
            ordNoArr += ($(this).parents('.my_order').attr('data-ord-no'));
            ordNoArr += comma;
            ordDtlSeqArr += ($(this).parents('.my_order').attr('data-ord-dtl-seq'));
            ordDtlSeqArr += comma;
            claimReasonCdArr += ($("#claimReasonCd_"+i).val());
            claimReasonCdArr += comma;
        })

        var param = {ordNo:$("#ordNo").val(),claimDtlReason:$("#claimDtlReason").val(),
            claimReasonCdArr:claimReasonCdArr,ordNoArr:ordNoArr,ordDtlSeqArr:ordDtlSeqArr};

        Storm.AjaxUtil.getJSONwoMsg(url, param, function(result) {
            if( !result.success){
                Storm.LayerUtil.alert("교환신청에 실패하였습니다.<br>고객센터로 문의 바랍니다.", "알림").done(function(){
                    location.reload();
                    //location.href = MOBILE_CONTEXT_PATH+"/front/order/orderDetail.do?ordNo="+$("#ordNo").val();
                });
            }else{
                Storm.LayerUtil.alert("교환신청 되었습니다.", "알림").done(function(){
                    location.reload();
                    //location.href = MOBILE_CONTEXT_PATH+"/front/order/orderDetail.do?ordNo="+$("#ordNo").val();
                });
            }
        });
    });
}

//환불팝업
function order_refund_pop(no){
    var url = MOBILE_CONTEXT_PATH+'/front/order/orderRefundPop.do?ordNo='+no;
    //모바일에선 화면이동
    location.href=url;
}

//환불신청
function claim_refund(){

    var refundAvailYn = true;
    $('.my_order').each(function() {
        var ordDtlStatusCd = ($(this).attr('data-ord-dtl-status-cd'));
        if(ordDtlStatusCd != '40' && ordDtlStatusCd != '50') {
            refundAvailYn = false;
            return false;
        }
    });
    if(!refundAvailYn) {
        Storm.LayerUtil.alert("교환하거나 취소한 상품이 있을 경우 환불이 불가능합니다.<br>고객센터로 문의하시기 바랍니다.");
        return false;
    }

    if($('#paymentWayCd').val() == '11' || $('#paymentWayCd').val() == '22') {
        if($('#memberOrdYn').val() == 'Y' && $('#inputYn').val() == 'N') {
            if($.trim($('#holderNm').val()) == '' || $.trim($('#bankCd').val()) == '' || $.trim($('#actNo').val()) == '') {
                Storm.LayerUtil.alert('환불계좌 등록 후 진행해 주시기 바랍니다.','알림');
                return false;
            }
        } else {
            if(Storm.validation.isEmpty($("#holderNm").val())){
                Storm.LayerUtil.alert("예금주를 입력해주세요.");
                return;
            }
            if($("#bankCd option:selected").val() == ''){
                Storm.LayerUtil.alert("은행명을 선택해 주세요.");
                return;
            }
            if(Storm.validation.isEmpty($("#actNo").val())){
                Storm.LayerUtil.alert("계좌번호를 입력해 주세요.");
                return;
            }
        }
    }

    if($("#claimReasonCd option:selected").val() == '') {
        Storm.LayerUtil.alert("환불 사유를 선택해 주세요");
        return;
    }

    if($.trim($('#claimDtlReason').val()) == '') {
        Storm.LayerUtil.alert("상세 사유를 입력해 주세요.");
        return;
    }

    Storm.LayerUtil.confirm('환불신청 하시겠습니까?', function() {
        var url = MOBILE_CONTEXT_PATH+'/front/order/claimRefund.do';
        var param = $('#form_id_refund').serializeArray();
        Storm.AjaxUtil.getJSONwoMsg(url, param, function(result) {
            if( !result.success){
                Storm.LayerPopupUtil.close("div_order_refund");//레이어팝업 닫기
                Storm.LayerUtil.alert("환불신청에 실패하였습니다.<br>고객센터로 문의 바랍니다.", "알림").done(function(){
                    location.reload();
                    //location.href = MOBILE_CONTEXT_PATH+"/front/order/orderDetail.do?ordNo="+$("#ordNo").val();
                });
            }else{
                Storm.LayerPopupUtil.close("div_order_refund");//레이어팝업 닫기
                Storm.LayerUtil.alert("환불신청 되었습니다.", "알림").done(function(){
                    location.reload();
                    //location.href = MOBILE_CONTEXT_PATH+"/front/order/orderDetail.do?ordNo="+$("#ordNo").val();
                });
            }
        });
    });
}
//환불팝업 닫기
function close_refund_pop(){
    Storm.LayerPopupUtil.close("div_order_refund");
}

//주문취소 팝업
function order_cancel_pop(no){
    var url = MOBILE_CONTEXT_PATH+'/front/order/orderCancelPop.do?ordNo='+no;
    location.href=url;
    /*Storm.AjaxUtil.load(url, function(result) {
        $('#popup_my_order_cancel').html(result);
        Storm.LayerPopupUtil.open($("#div_order_cancel"));
    })*/
}

// 선택상품취소
function order_cancel(){
    if($('#paymentWayCd').val() == '11' || $('#paymentWayCd').val() == '22') {
        if($('#memberOrdYn').val() == 'Y' && $('#inputYn').val() == 'N') {
            if($.trim($('#holderNm').val()) == '' || $.trim($('#bankCd').val()) == '' || $.trim($('#actNo').val()) == '') {
                Storm.LayerUtil.alert('환불계좌 등록 후 진행해 주시기 바랍니다.','알림');
                return false;
            }
        } else {
            if(Storm.validation.isEmpty($("#holderNm").val())){
                Storm.LayerUtil.alert("예금주를 입력해주세요.");
                return;
            }
            if($("#bankCd option:selected").val() == ''){
                Storm.LayerUtil.alert("은행명을 선택해주세요.");
                return;
            }
            if(Storm.validation.isEmpty($("#actNo").val())){
                Storm.LayerUtil.alert("계좌번호를 입력해주세요.");
                return;
            }
        }
    }

    if($('#claimReasonCd').val() == '') {
        Storm.LayerUtil.alert('취소 사유를 선택해 주십시요.','알림');
        return false;
    }
    if($.trim($('#claimDtlReason').val()) == '') {
        Storm.LayerUtil.alert('취소 상세사유를 입력해 주십시요.','알림');
        return false;
    }
    var url = MOBILE_CONTEXT_PATH+'/front/order/calcDlvrAmt.do'
    , param = {}
    , ordDtlSeqArr = ""
    var comma = ',';
    var partCancelYn = '';
    var itemLength = $('input:checkbox[name=itemNoArr]').length;
    var chkItem = $('input:checkbox[name=itemNoArr]:checked').length;
    if(chkItem < 1) {
        Storm.LayerUtil.alert('취소하실 상품을 선택해 주십시요.','알림');
        return false;
    }

    if($('#ordStatusCd').val() == '10') {
        if(itemLength != chkItem) {
            Storm.LayerUtil.alert('입금 전 취소는 전체 취소만 가능합니다.','알림');
            return false;
        }
    }

    if($('#escrowYn').val() == 'Y') {
        if(itemLength != chkItem) {
            Storm.LayerUtil.alert('에스크로 결제는 전체 취소만 가능합니다.','알림');
            return false;
        }
    }

    if($('#paycoYn').val() == 'Y') {
        if(itemLength != chkItem) {
            Storm.LayerUtil.alert('페이코 결제는 전체 취소만 가능합니다.','알림');
            return false;
        }
    }

    if($('#actPartCancelYn').val() == 'N') {
        if(itemLength != chkItem) {
            Storm.LayerUtil.alert('실시간 계좌이체는 전체 취소만 가능합니다.','알림');
            return false;
        }
    }

    if($('#mobilePartCancelYn').val() == 'N') {
        if(itemLength != chkItem) {
            Storm.LayerUtil.alert('휴대폰 결제는 전체 취소만 가능합니다.','알림');
            return false;
        }
    }

    if($('#claimReasonCd').val() == '') {
        Storm.LayerUtil.alert('취소 사유를 선택해 주십시요.','알림');
        return false;
    }

    if($.trim($('#claimDtlReason').val()) == '') {
        Storm.LayerUtil.alert('취소 상세사유를 입력해 주십시요.','알림');
        return false;
    }

    if(itemLength == chkItem) {
        partCancelYn = 'N';
    } else {
        partCancelYn = 'Y';
    }
    $('input:checkbox[name=itemNoArr]:checked').each(function(i) {
        if(i != 0 )ordDtlSeqArr += comma;
        ordDtlSeqArr += ($(this).parents('.my_order').attr('data-ord-dtl-seq'));
    })
    var param = {ordNo:$("#ordNo").val(),ordDtlSeqArr:ordDtlSeqArr,partCancelYn:partCancelYn,cancelType:$('#cancelType').val(),
        claimReasonCd:$('#claimReasonCd').val(),claimDtlReason:$('#claimDtlReason').val(),holderNm:$('#holderNm').val(),
        bankCd:$('#bankCd').val(),actNo:$('#actNo').val(),paymentNo:$('#paymentNo').val()};
    var notiMsg = "취소처리";
    Storm.AjaxUtil.getJSONwoMsg(url, param, function(result) {
        if(result.success) {
            if(result.data.dlvrChangeYn){
                notiMsg = "취소신청"
            }
            Storm.LayerUtil.confirm("선택한 상품을 "+notiMsg+" 하시겠습니까?", function() {
                url = MOBILE_CONTEXT_PATH+"/front/order/cancelOrder.do";
                Storm.AjaxUtil.getJSONwoMsg(url, param, function(result) {
                    if(result.success) {
                        Storm.LayerUtil.alert(notiMsg+" 되었습니다.", "알림").done(function(){
                            location.reload();
                            //location.href = MOBILE_CONTEXT_PATH+"/front/order/orderDetail.do?ordNo="+$("#ordNo").val();
                        });
                    } else {
                        Storm.LayerUtil.alert(notiMsg+"에 실패하였습니다.<br>고객센터로 문의 바랍니다.", "알림").done(function(){
                            location.reload();
                            //location.href = MOBILE_CONTEXT_PATH+"/front/order/orderDetail.do?ordNo="+$("#ordNo").val();
                        });
                    }
                })
            });
        } else {
            if(result.message == null) {
                Storm.LayerUtil.alert(notiMsg+"에 실패하였습니다.<br>고객센터로 문의 바랍니다.", "알림").done(function(){
                    location.reload();
                });
            } else {
                Storm.LayerUtil.alert(result.message).done(function(){
                    location.reload();
                });
            }
        }

    });
}

// 구매확정 처리
function updateBuyConfirm(ordNo,ordDtlSeq){
    var url = MOBILE_CONTEXT_PATH+'/front/order/updateBuyConfirm.do';
    var param = {ordNo:ordNo,ordDtlSeq:ordDtlSeq};
    var returnUrl = '';
    Storm.LayerUtil.confirm('구매확정 하시겠습니까?', function() {
        Storm.AjaxUtil.getJSONwoMsg(url, param, function(result) {
            if(result.success) {
                Storm.LayerUtil.alert('구매확정 처리되었습니다.','알림').done(function(){
                    location.reload();
                })
            } else {
                Storm.LayerUtil.alert('구매확정 처리가 실패하였습니다.<br>고객센터로 문의 바랍니다.', '알림').done(function(){
                    location.reload();
                })
            }
        })
    });
}

// 주문취소팝업 닫기
function close_cancel_pop(){
    Storm.LayerPopupUtil.close("div_order_cancel");
}
// 비회원주문조회
function nonMember_order_list(){
    var url = MOBILE_CONTEXT_PATH+'/front/order/selectNonMemberOrder.do';
    var param = jQuery('#nonMemberloginForm').serialize();
    Storm.AjaxUtil.getJSON(url, param, function(result) {
        if(result.success) {
            $('#nonMemberloginForm').attr("action",MOBILE_CONTEXT_PATH+'/front/order/nonOrderList.do')
            $('#nonMemberloginForm').submit();
        }else{
            Storm.LayerUtil.alert("주문정보를 확인해주시기 바랍니다.","알림");
        }
    });
}

/**********************************************************************************************************************
CJ대한통운   https://www.doortodoor.co.kr/parcel/doortodoor.do?fsp_action=PARC_ACT_002&fsp_cmd=retrieveInvNoACT&invc_no=
우체국택배   https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?sid1=
한진택배    http://www.hanjin.co.kr/Delivery_html/inquiry/result_waybill.jsp?wbl_num=
현대택배    http://www.hlc.co.kr/hydex/jsp/tracking/trackingViewCus.jsp?InvNo=
로젠택배    http://d2d.ilogen.com/d2d/delivery/invoice_tracesearch_quick.jsp?slipno=
KG로지스   http://www.kglogis.co.kr/delivery/delivery_result.jsp?item_no=
CVsnet 편의점택배    http://www.cvsnet.co.kr/postbox/m_delivery/local/local.jsp?invoice_no=
KGB택배   http://www.kgbls.co.kr//sub5/trace.asp?f_slipno=
경동택배    http://kdexp.com/sub3_shipping.asp?stype=1&yy=&mm=&p_item=
대신택배    http://home.daesinlogistics.co.kr/daesin/jsp/d_freight_chase/d_general_process2.jsp?billno1=
일양로지스   http://www.ilyanglogis.com/functionality/tracking_result.asp?hawb_no=
합동택배    http://www.hdexp.co.kr/parcel/order_result_t.asp?stype=1&p_item=
GTX로지스  http://www.gtxlogis.co.kr/tracking/default.asp?awblno=
건영택배    http://www.kunyoung.com/goods/goods_01.php?mulno=
천일택배    http://www.chunil.co.kr/HTrace/HTrace.jsp?transNo=
한의사랑택배  http://www.hanips.com/html/sub03_03_1.html?logicnum=
한덱스 http://www.hanjin.co.kr/Logistics_html
EMS http://service.epost.go.kr/trace.RetrieveEmsTrace.postal?ems_gubun=E&POST_CODE=
DHL http://www.dhl.co.kr/content/kr/ko/express/tracking.shtml?brand=DHL&AWB=
TNTExpress  http://www.tnt.com/webtracker/tracking.do?respCountry=kr&respLang=ko&searchType=CON&cons=
UPS http://wwwapps.ups.com/WebTracking/track?track=yes&trackNums=
Fedex   http://www.fedex.com/Tracking?ascend_header=1&clienttype=dotcomreg&cntry_code=kr&language=korean&tracknumbers=
USPS    http://www.tnt.com/webtracker/tracking.do?respCountry=kr&respLang=ko&searchType=CON&cons=
i-Parcel    https://tracking.i-parcel.com/Home/Index?trackingnumber=
DHL Global Mail http://webtrack.dhlglobalmail.com/?trackingnumber=
범한판토스   http://totprd.pantos.com/jsp/gsi/vm/popup/notLoginTrackingListExpressPoPup.jsp?quickType=HBL_NO&quickNo=
에어보이 익스프레스  http://www.airboyexpress.com/Tracking/Tracking.aspx?__EVENTTARGET=ctl00$ContentPlaceHolder1$lbtnSearch&__EVENTARGUMENT=__VIEWSTATE:/wEPDwUKLTU3NTA3MDQxMg9kFgJmD2QWAgIDD2QWAgIED2QWBGYPDxYCHgdWaXNpYmxlaGRkAgYPDxYCHwBnZGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja
GSMNtoN http://www.gsmnton.com/gsm/handler/Tracking-OrderList?searchType=TrackNo&trackNo=
APEX(ECMS Express)  http://www.apexglobe.com
KGL 네트웍스    http://www.hydex.net/ehydex/jsp/home/distribution/tracking/tracingView.jsp?InvNo=
굿투럭 http://www.goodstoluck.co.kr/#modal
호남택배    http://honamlogis.co.kr
**********************************************************************************************************************/

// 배송추적 팝업
function trackingDelivery(company,tranNo){
    var trans_url ="";
    if(company == '01'){//현대택배
        trans_url = "http://www.hlc.co.kr/hydex/jsp/tracking/trackingViewCus.jsp?InvNo="+tranNo;
        window.open(trans_url, 'delivery_pop','top=100, left=250, width=541px, height=666px, resizble=no, scrollbars=yes, align=center');
    }else if(company == '02'){//한진택배
        trans_url = "http://www.hanjin.co.kr/Delivery_html/inquiry/result_waybill.jsp?wbl_num="+tranNo;
        window.open(trans_url, 'delivery_pop','top=100, left=250, width=541px, height=666px, resizble=no, scrollbars=yes, align=center');
    }else if(company == '03'){//하나로택배
        trans_url = "http://www.hanarologis.com/branch/chase/listbody.html?a_gb=center&a_cd=4&a_item=0&fr_slipno="+tranNo;
        window.open(trans_url, 'delivery_pop','top=100, left=250, width=541px, height=666px, resizble=no, scrollbars=yes, align=center');
    }else if(company == '04'){//KT로지스
        trans_url = "http://www.kglogis.co.kr/delivery/delivery_result.jsp?item_no="+tranNo;
    }else if(company == '05'){//CJ택배
        trans_url = "http://www.cjgls.co.kr/kor/service/service02_01.asp?slipno="+tranNo;
        window.open(trans_url, 'delivery_pop','top=100, left=250, width=541px, height=666px, resizble=no, scrollbars=yes, align=center');
    }else if(company == '06'){//CJ HTH택배
        trans_url = "http://www.doortodoor.co.kr/servlets/cmnChnnel?tc=dtd.cmn.command.c03condiCrg01Cmd&amp;amp;invc_no="+tranNo;
        window.open(trans_url, 'delivery_pop','top=100, left=250, width=541px, height=666px, resizble=no, scrollbars=yes, align=center');
    }else if(company == '07'){//천일택배
        trans_url = "http://www.cyber1001.co.kr/kor/taekbae/HTrace.jsp?transNo="+tranNo;
        window.open(trans_url, 'delivery_pop','top=100, left=250, width=541px, height=666px, resizble=no, scrollbars=yes, align=center');
    }else if(company == '08'){//아주택배
        Storm.LayerUtil.alert("아주택배 > 존재하지 않는 택배사입니다.","안내");
    }else if(company == '09'){//동부익스프레스
        trans_url = "http://www.dongbuexpress.co.kr/Html/Delivery/DeliveryCheck.jsp?mode=SEARCH&search_type=1&search_item_no="+tranNo;
        window.open(trans_url, 'delivery_pop','top=100, left=250, width=541px, height=666px, resizble=no, scrollbars=yes, align=center');
    }else if(company == '10'){//옐로우캡 택배
        trans_url = "http://www.yellowcap.co.kr/custom/inquiry_result.asp?INVOICE_NO="+tranNo;
        window.open(trans_url, 'delivery_pop','top=100, left=250, width=541px, height=666px, resizble=no, scrollbars=yes, align=center');
    }else if(company == '11'){//우리택배
        Storm.LayerUtil.alert("우리택배 > 존재하지 않는 택배사입니다.","안내");
    }else if(company == '12'){//KGB택배
        trans_url = "http://www.kgbls.co.kr/sub5/trace.asp?f_slipno="+tranNo;
        window.open(trans_url, 'delivery_pop','top=100, left=250, width=541px, height=666px, resizble=no, scrollbars=yes, align=center');
    }else if(company == '13'){//로젠택배
        trans_url = "http://d2d.ilogen.com/d2d/delivery/invoice_tracesearch_quick.jsp?slipno="+tranNo;
        window.open(trans_url, 'delivery_pop','top=100, left=250, width=541px, height=666px, resizble=no, scrollbars=yes, align=center');
    }else if(company == '14'){//중앙택배
        Storm.LayerUtil.alert("중앙택배 > 존재하지 않는 택배사입니다.","안내");
    }else if(company == '15'){//경동택배
        trans_url = "http://www.kdexp.com/sub4_1.asp?stype=1&p_item="+tranNo;
        window.open(trans_url, 'delivery_pop','top=100, left=250, width=541px, height=666px, resizble=no, scrollbars=yes, align=center');
    }else if(company == '16'){//우체국택배
        trans_url = "http://service.epost.go.kr/trace.RetrieveRegiPrclDeliv.postal?sid1="+tranNo;
        window.open(trans_url, 'delivery_pop','top=100, left=250, width=541px, height=666px, resizble=no, scrollbars=yes, align=center');
    }else if(company == '17'){//직접배송
        Storm.LayerUtil.alert("수령방식이 택배가 아닙니다.","안내");
    }
}
/*
 * 모바일에서 기능없어 주석 처리
 *
// 현금영수증 발급신청팝업
function cash_receipt_pop(){
    Storm.LayerPopupUtil.open($("#popup_my_cash"));
}

// 현금영수증 발급신청
function apply_cash_receipt(){


    if(Storm.validation.isEmpty($("#issueWayNo").val())){
        Storm.LayerUtil.alert("인증번호를 입력해주세요.");
        return false;
    }
    if(Storm.validation.isEmpty($("#cash_email01").val())|| Storm.validation.isEmpty($("#cash_email02").val())) {
        jQuery('#cash_email01').focus();
        Storm.LayerUtil.alert('이메일을 입력해주세요.');
        return false;
    }
    if(Storm.validation.isEmpty($("#cashTelNo").val())){
        Storm.LayerUtil.alert('전화번호를 입력해주세요.');
        return false;
    }
    $('#telNo').val($('#cashTelNo').val());
    if($('#cash_personal').is(":checked") == true){
        $("#useGbCd").val("01");
    }else{
        $("#useGbCd").val("02");
    }
    if($('#pgCd').val() == '00') {
        notiMsg = "신청";
    } else {
        notiMsg = "처리";
    }
    $('#email').val($('#cash_email01').val()+"@"+$('#cash_email02').val());
    Storm.LayerUtil.confirm('현금영수증 발급신청 하시겠습니까?', function() {
        var url = MOBILE_CONTEXT_PATH+'/front/order/applyCashReceipt.do';
        var param = $('#form_id_order_info').serializeArray();
        Storm.AjaxUtil.getJSONwoMsg(url, param, function(result) {
            if( !result.success){
                Storm.LayerUtil.alert("현금영수증 발급"+notiMsg+"에 실패하였습니다.<br>고객센터로 문의 바랍니다.", "알림").done(function(){
                    //Storm.LayerPopupUtil.close("popup_my_cash");
                    location.reload();
                });
            }else{
                Storm.LayerUtil.alert("현금영수증 발급"+notiMsg+" 되었습니다.", "알림").done(function(){
                    //Storm.LayerPopupUtil.close("popup_my_cash");
                    location.reload();
                });
            }
        });
    })
}
// 현금영수증 팝업닫기
function close_cash_receipt_pop(){
    Storm.LayerPopupUtil.close("popup_my_cash");
}
// 세금계산서 발급신청팝업
function tax_bill_pop(){
    Storm.LayerPopupUtil.open($("#popup_my_tax"));
}
// 세금계산서 발급신청
function apply_tax_bill(){
    if(Storm.validation.isEmpty($("#companyNm").val())){
        $('#companyNm').validationEngine('showPrompt', '상호명을 입력해주세요.', 'error');
        return false;
    }
    if(Storm.validation.isEmpty($("#bizNo").val())){
        $('#bizNo').validationEngine('showPrompt', '사업자 번호를 입력해주세요.', 'error');
        return false;
    }
    if(Storm.validation.isEmpty($("#ceoNm").val())){
        $('#ceoNm').validationEngine('showPrompt', '대표자명을 입력해주세요.', 'error');
        return false;
    }
    if(Storm.validation.isEmpty($("#bsnsCdts").val())){
        $('#bsnsCdts').validationEngine('showPrompt', '업태를 입력해주세요.', 'error');
        return false;
    }
    if(Storm.validation.isEmpty($("#item").val())){
        $('#item').validationEngine('showPrompt', '업종을 입력해주세요.', 'error');
        return false;
    }
    if(Storm.validation.isEmpty($("#postNo").val())){
        $('#postNo').validationEngine('showPrompt', '주소를 입력해주세요.', 'error');
        return false;
    }
    if(Storm.validation.isEmpty($("#managerNm").val())){
        $('#managerNm').validationEngine('showPrompt', '담당자명을 입력해주세요.', 'error');
        return false;
    }
    if(Storm.validation.isEmpty($("#tax_email01").val())|| Storm.validation.isEmpty($("#tax_email02").val())) {
        $('#tax_email01').validationEngine('showPrompt', '담당자 이메일을 입력해주세요.', 'error');
        return false;
    }
    if(Storm.validation.isEmpty($("#taxTelNo").val())){
        $('#taxTelNo').validationEngine('showPrompt', '담당자 전화번호를 입력해주세요.', 'error');
        return false;
    }
    $('#telNo').val($('#taxTelNo').val());
    if($('#tax_Yes').is(":checked") == true){
        $("#useGbCd").val("03");
    }else{
        $("#useGbCd").val("04");
    }
    $('#email').val($('#tax_email01').val()+"@"+$('#tax_email02').val());
    Storm.LayerUtil.confirm('세금계산서 발급신청 하시겠습니까?', function() {
        var url = MOBILE_CONTEXT_PATH+'/front/order/applyTaxBill.do';
        var param = $('#form_id_order_info').serializeArray();
        Storm.AjaxUtil.getJSONwoMsg(url, param, function(result) {
            if( !result.success){
                Storm.LayerUtil.alert(result.message, "알림").done(function(){
                    Storm.LayerPopupUtil.close("popup_my_tax");
                });
            }else{
                Storm.LayerUtil.alert("세금계산서 신청처리 되었습니다.", "알림").done(function(){
                    Storm.LayerPopupUtil.close("popup_my_tax");
                    location.href = MOBILE_CONTEXT_PATH+"/front/order/orderList.do";
                });
            }
        });
    })
}
// 세금계산서 팝업닫기
function close_tax_bill_pop(){
    Storm.LayerPopupUtil.close("popup_my_tax");
}


 * 현금영수증조회 popup
 * pg_cd : pg사코드
 * tid : 연계승인코드

function show_cash_receipt(){
    var pgCd = $("#pgCd").val();
    var tid = $("#txNo").val();
    var ordNo = $("#ordNo").val();
    var totAmt = $("#totAmt").val();

    // 추가할 변수
    var paymentWayCd = $("#paymentWayCd").val(); // 결제수단코드
    var mid = $("#mid").val(); //상점ID
    var confirmHashData = $("#confirmHashData").val(); // 검증용 Hash값
    var confirmNo = $("#confirmNo").val(); // 승인번호
    var confirmDttm = $("#confirmDttm").val(); // 승인일시(8자리)
    var realServiceYn = $("#realServiceYn").val(); // 실시간여부 Y, N
    var mode = ((realServiceYn == "Y")? "service": "test");  //서비스 구분 ( test:테스트서버,  service:실서버 )

    if(pgCd == '01'){// KCP
       var showreceiptUrl = "https://admin8.kcp.co.kr/assist/bill.BillActionNew.do?cmd=cash_bill&cash_no="+tid+"&order_no="+ordNo+"&trade_mony="+totAmt;
       window.open(showreceiptUrl,"showreceipt","width=420,height=670, scrollbars=no,resizable=no");
    }else if(pgCd == '02'){ //이니시스
        var showreceiptUrl = "https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/Cash_mCmReceipt.jsp?noTid="+tid + "&clpaymethod=22";
        window.open(showreceiptUrl,"showreceipt","width=380,height=540, scrollbars=no,resizable=no");
    }else if(pgCd == '03'){ //LGU
        var paramStr = "";
        var stype = "";

        if (mid == "" || ordNo == "") {
            return ;
        } else {
                 if(paymentWayCd == "23") stype = "SC0010"; //신용카드
            else if(paymentWayCd == "21") stype = "SC0030"; //계좌이체
            else if(paymentWayCd == "22") stype = "SC0040"; //무통장

            if(stype == "CAS" || stype == "cas" || stype == "SC0040"){
                stype = "SC0040";
                if (seqno == "") seqno = "001";
                paramStr = "orderid="+ordNo+"&mid="+mid+"&seqno="+seqno+"&servicetype="+stype;
            }else if(stype == "BANK" || stype == "bank" || stype == "SC0030"){
                stype = "SC0030";
                paramStr = "orderid="+ordNo+"&mid="+mid+"&servicetype="+stype;
            }else if(stype == "CR" || stype == "cr" || stype == "SC0100"){
                stype = "SC0100";
                paramStr = "orderid="+ordNo+"&mid="+mid+"&servicetype="+stype;
            }

            var showreceiptUrl = "http://pg.dacom.net"+ (mode=="service"? "": ":7080") +"/transfer/cashreceipt_mp.jsp?"+paramStr;
            window.open(showreceiptUrl, "showreceipt","width=380,height=600,menubar=0,toolbar=0,scrollbars=no,resizable=no, resize=1,left=252,top=116");
        }
    }else if(pgCd == '04'){ //ALLTHEGATE
        Storm.LayerUtil.alert("ALLTHEGATE로 결재하신 주문건의 영수증은 고객님의 메일로 발송됩니다.", "알림")
    }else if(pgCd == '81'){ //PAY PAL
        Storm.LayerUtil.alert("PAY PAL로 결재하신 주문건의 영수증은 고객님의 메일로 발송됩니다.", "알림")
    }else{ //국세청조회사이트
        var showreceiptUrl = "http://www.taxsave.go.kr/servlets/AAServlet?tc=tss.web.aa.ntc.cmd.RetrieveMainPageCmd";
        window.open(showreceiptUrl,"showreceipt","width=380,height=540, scrollbars=no,resizable=no");
    }
}

  신용카드결제정보 조회 popup
 * pg_cd : pg사코드
 * tid : 연계승인코드

function show_card_bill(){
    var pgCd = $("#pgCd").val();
    var tid = $("#txNo").val();
    var ordNo = $("#ordNo").val();;
    var totAmt = $("#totAmt").val();

    // 추가할 변수
    var paymentWayCd = $("#paymentWayCd").val(); // 결제수단코드
    var mid = $("#mid").val(); //상점ID
    var confirmHashData = $("#confirmHashData").val(); // 검증용 Hash값
    var confirmNo = $("#confirmNo").val(); // 승인번호
    var confirmDttm = $("#confirmDttm").val(); // 승인일시(8자리)
    var realServiceYn = $("#realServiceYn").val(); // 실시간여부 Y, N
    var mode = ((realServiceYn == "Y")? "service": "test");  //서비스 구분 ( test:테스트서버,  service:실서버 )

    if(pgCd == '01'){// KCP
        window.open("https://admin8.kcp.co.kr/assist/bill.BillAction.do?cmd=card_bill&tno="+tid+"&order_no="+ordNo+"&trade_mony="+totAmt, "kcpReceipt", "width=470,height=815");
    }else if(pgCd == '02'){//이니시스
        window.open("https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=" +tid + "&noMethod=1", "iniReceipt" + tid, "width=405,height=525");
    }else if(pgCd == '03'){//LGU
        var showreceiptUrl = "http://pgweb.dacom.net"+ (mode=="test"? ":7080" : "") +"/pg/wmp/etc/jsp/Receipt_Link.jsp?mertid="+mid+"&tid="+tid+"&authdata="+confirmHashData;
        window.open(showreceiptUrl,"showreceipt","width=450, height=600,toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=no");
    }else if(pgCd == '04'){ //ALLTHEGATE
        var showreceiptUrl = "http://allthegate.com/customer/receiptLast3.jsp?sRetailer_id="+mid+"&approve="+confirmNo+"&send_no="+tid+"&send_dt="+confirmDttm.substring(0,8);
        window.open(showreceiptUrl,"showreceipt","width=450, height=600,toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=no");
    }else if(pgCd == '41'){ //PAYCO
        var realServiceYn = $('#realServiceYn').val();
        var receiptUrl = '';
        if(realServiceYn === 'Y') {
            receiptUrl = 'https://bill.payco.com';
        } else {
            receiptUrl = 'https://alpha-bill.payco.com';
        }
        var showreceiptUrl = receiptUrl + "/outseller/receipt/"+confirmNo+"?receiptKind=card";
        window.open(showreceiptUrl,"paycoReceipt","width=450, height=600,toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=no");
    }else{
        Storm.LayerUtil.alert("해당하는 PG사 코드가 없습니다.", "알림");
    }
}

  세금계산서발급정보 조회 popup
 * pg_cd : pg사코드
 * tid : 연계승인코드

function show_tax_bill(){
    var showreceiptUrl = "http://www.taxsave.go.kr/servlets/AAServlet?tc=tss.web.aa.ntc.cmd.RetrieveMainPageCmd";
    window.open(showreceiptUrl,"showreceipt","width=380,height=540, scrollbars=no,resizable=no");
}
*/

//통신판매사업자 팝업
function communicationPopup(){
    window.open("http://www.ftc.go.kr/info/bizinfo/communicationList.jsp", "통신판매사업자");
}

function click_banner(mod, link){
    if(mod == "N"){
        window.open(link);
    }else{
        location.href = link;
    }

}

/*  관심상품, 장바구니 등록 */
var ListBtnUtil = {
    customAjax:function(url, param, callback) {
        Storm.waiting.start();
        $.ajax({
            type : 'post',
            url : url,
            data : param,
            dataType : 'json',
            traditional:true
        }).done(function(result) {
            if (result) {
                console.log('ajaxUtil.getJSON :', result);
                Storm.AjaxUtil.viewMessage(result, callback);
            } else {
                callback();
            }
            Storm.waiting.stop();
        }).fail(function(result) {
            Storm.waiting.stop();
            Storm.AjaxUtil.viewMessage(result.responseJSON, callback);
        });
    }
    , insertInterest:function(goodsNo){ //관심상품담기
        if(!loginYn) {
            Storm.LayerUtil.confirm("로그인이 필요한 서비스입니다. 지금 로그인 하시겠습니까?",
                    function() {
                    var returnUrl = window.location.pathname+window.location.search;
                    location.href= MOBILE_CONTEXT_PATH+"/front/login/viewLogin.do?returnUrl="+returnUrl;
                    },''
                );
        } else {
            var url = MOBILE_CONTEXT_PATH+'/front/interest/insertInterest.do';
            var param = {goodsNo : goodsNo}
            Storm.AjaxUtil.getJSON(url, param, function(result) {
                 if(result.success) {
                    Storm.LayerUtil.confirm('관심상품으로 이동 하시겠습니까?', function() {
                        location.href=MOBILE_CONTEXT_PATH+"/front/interest/interestList.do";
                    })
                 }
            })
        }
    }
    , insertBasket:function(goodsNo) {
        Storm.LayerUtil.confirm('장바구니에 등록하시겠습니까?', function() {
            var url = MOBILE_CONTEXT_PATH+'/front/interest/insertBasketFromList.do'
                , param = {'goodsNoArr':goodsNo};

            ListBtnUtil.customAjax(url, param, function(result) {
                if(result.success){
                    if(basketPageMovYn === 'Y') {
                        Storm.LayerPopupUtil.open($('#success_basket'));//장바구니 등록성공팝업
                    } else {
                        location.href = MOBILE_CONTEXT_PATH+"/front/basket/basketList.do";
                    }
                } else {
                    if(result.data.adultFlag != '' && result.data.adultFlag === 'Y') {
                        location.href = MOBILE_CONTEXT_PATH+'/front/interest/adultPage.do';
                    }
                }
            });
        });
    }
};

/************************** 상품검색관련 script ****************************/