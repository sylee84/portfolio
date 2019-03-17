// 그리드 관련 유틸
Storm.GridUtil = {
    /**
     * <pre>
     * 함수명 : appendPaging
     * 설  명 : 입력받은 조회 데이터와 ID들로 페이징 네이게이션을 생성한다.
     * 사용법 :
     * 작성일 : 2016. 5. 11.
     * 작성자 : minjae
     * 수정내역(수정일 수정자 - 수정내용)
     * -------------------------------------
     * 2016. 5. 11. minjae - 최초 생성
     * </pre>
     *
     * @param formId
     *            조회조건이 속한 폼의 ID
     * @param parentId
     *            페이징이 추가될 부모 엘리먼트의 ID
     * @param resultListModel
     *            JSON으로 받은 조회 데이터
     * @param pagingId
     *            생성할 페이징의 ID
     * @param callback
     *            페이징의 페이지 클릭시 실행할 함수(조회 함수)
     */
    appendPaging : function(formId, parentId, resultListModel, pagingId, callback) {
        jQuery('#' + parentId).html(Storm.GridUtil.paging(resultListModel, pagingId));
        if(callback) {
            jQuery('#' + parentId).grid(jQuery('#' + formId), callback);
        } else {
            jQuery('#' + parentId).grid(jQuery('#' + formId));
        }
    },

    /**
     * <pre>
     * 함수명 : paging
     * 설  명 : 입력받은 조회 데이터와 ID로 페이징 네이게이션 코드를 생성한다.
     *          현재는 내부적으로 사용, 외부에서 appendPaging으로 처리가 안될 경우 따로 불러서 처리...
     * 사용법 :
     * 작성일 : 2016. 5. 11.
     * 작성자 : minjae
     * 수정내역(수정일 수정자 - 수정내용)
     * -------------------------------------
     * 2016. 5. 11. minjae - 최초 생성
     * </pre>
     *
     * @param resultListModel
     *            JSON으로 받은 조회 데이터
     * @param pagingId
     *            생성할 페이징의 ID
     */
    paging : function(resultListModel, id) {
        var currPageDiv = parseInt(resultListModel.page / 10 + 1, 10),
        firstOfPage = parseInt((currPageDiv - 1) * 10 + 1, 10),
        lastPage = parseInt(Math.min(currPageDiv * 10, resultListModel.totalPages), 10),
        p = '<ul class="pages">';

        if (currPageDiv > 1) {
            p += '<li class="prev"><a href="#none" class="pre ico_comm" data-page="' + (firstOfPage - 1) + '">';
            p += '<span><img src="'+MOBILE_CONTEXT_PATH+'/front/img/common/btn_prev.gif" alt="이전페이지로 이동"></span></a></li>';
        }

        for(var i = firstOfPage; i <= lastPage; i++) {
            if(resultListModel.page == i){
                p += '<li class="active"><span>'+i+'</span></li>';
            }else{
                p += '<li><a href="#none" class="num" data-page="' + i + '">'+i+'</a></li>';
            }
        }

        if(resultListModel.totalPages > currPageDiv * 10) {
            p += '<li class="prev"><a href="#none" class="nex ico_comm" data-page="' + (lastPage + 1) + '">';
            p += '<span><img src="'+MOBILE_CONTEXT_PATH+'/front/img/common/btn_next.gif" alt="이전페이지로 이동"></span></a></li>';
        }
        p +'</ul>'
        return p;
    },

    /**
     * <pre>
     * 함수명 : appendMorePaging
     * 설  명 : 입력받은 조회 데이터와 ID들로 더보기 페이징 네이게이션을 생성한다.
     * 사용법 :
     * 작성일 : 2017. 03. 28.
     * 작성자 : proliebe
     * 수정내역(수정일 수정자 - 수정내용)
     * -------------------------------------
     * 2017. 03. 28. proliebe - 최초 생성
     * </pre>
     *
     * @param formId
     *            조회조건이 속한 폼의 ID
     * @param parentId
     *            페이징이 추가될 부모 엘리먼트의 ID
     * @param resultListModel
     *            JSON으로 받은 조회 데이터
     * @param pagingId
     *            생성할 페이징의 ID
     * @param callback
     *            페이징의 페이지 클릭시 실행할 함수(조회 함수)
     */
    appendMorePaging : function(formId, parentId, resultListModel, pagingId, callback) {
        jQuery('#' + parentId).html(Storm.GridUtil.morePaging(resultListModel, pagingId));
        if(callback) {
            jQuery('#' + parentId).grid(jQuery('#' + formId), callback);
        } else {
            jQuery('#' + parentId).grid(jQuery('#' + formId));
        }
    },

    /**
     * <pre>
     * 함수명 : morePaging
     * 설  명 : 입력받은 조회 데이터와 ID로 페이징 네이게이션 코드를 생성한다.
     * 사용법 :
     * 작성일 : 2017. 03. 28.
     * 작성자 : proliebe
     * 수정내역(수정일 수정자 - 수정내용)
     * -------------------------------------
     * 2017. 03. 28. proliebe - 최초 생성
     * </pre>
     *
     * @param resultListModel
     *            JSON으로 받은 조회 데이터
     * @param pagingId
     *            생성할 페이징의 ID
     */
    morePaging : function(resultListModel, id) {
        var pageWidth,
        p = '<div class="list_bottom" id="'+id+'">';

        if (resultListModel.totalPages > 1 && (resultListModel.page != resultListModel.totalPages)) {
            p += '<span class="more_view nex" data-page="'+resultListModel.page+'" data-total-pages="'+resultListModel.totalPages+'">';
            p += '더보기<span class="icon_more_view"></span>';
            p += '</span>';
        } else {
            pageWidth = 'style="width:100%"';
        }

        p +='<div class="list_page_view" '+pageWidth+'><em>'+resultListModel.page+'</em> / '+resultListModel.totalPages;
        p += '</div>';
        return p;
    }
};