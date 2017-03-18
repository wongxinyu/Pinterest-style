window.onload = function() {
    waterfall('container', 'box');
    
    var dataJson = {'data':[
        {'src':'moonnight.jpg'},
        {'src':'Moon.jpg'},
        {'src':'eyes.jpg'},
        {'src':'flowertree.jpg'},
        {'src':'handsome.jpg'},
        {'src':'Moon.jpg'},
        {'src':'moonnight.jpg'},
        {'src':'pingxie.jpg'},
        {'src':'shelock.jpg'},
        {'src':'tree.jpg'},
        {'src':'yujizi.jpg'},
        ]};
    
    window.onscroll = function() {
        if (checkScrollSlide()) {
            var oParent = document.getElementById('container');
            for (var i=0; i<dataJson.data.length; i++){
                var oBox = document.createElement('div');
                oBox.className = 'box';
                oParent.appendChild(oBox);
                var oPic = document.createElement('div');
                oPic.className = 'pic';
                oBox.appendChild(oPic);
                var oImg = document.createElement('img');
                oImg.src = 'http://on0bty1hg.bkt.clouddn.com/img/' + dataJson.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('container', 'box');
        }

    }
}

function waterfall(parent, box) {
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent, box);
    
    var oBoxWidth = oBoxs[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth / oBoxWidth);
    
    oParent.style.cssText = 'width:' + (oBoxWidth * cols) + 'px;margin:0 auto';

    var heightArr = [];
    for (var i=0; i<oBoxs.length; i++) {
        if (i<cols) {
            heightArr.push(oBoxs[i].offsetHeight);
        } else {
            var minHeight = Math.min.apply(null, heightArr);
            var minIndex = getMinHeightIndex(heightArr, minHeight);

            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minHeight + 'px';
            // oBoxs[i].style.left = oBoxWidth * index + 'px';
            oBoxs[i].style.left = oBoxs[minIndex].offsetLeft + 'px';
            heightArr[minIndex] += oBoxs[i].offsetHeight;
        }
    }
    console.log(heightArr);

}

function getByClass(parent, className) {
    var boxArr = [],
        oElements = parent.getElementsByTagName('*');
    
    for (var i=0; i<oElements.length; i++) {
        if (oElements[i].className === className) {
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}

function getMinHeightIndex(arr, val) {
    for (var i in arr){
        if (arr[i] === val) {
            return i;
        }
    }
}

function checkScrollSlide() {
    var oParent = document.getElementById('container');
    var oBoxs = getByClass(oParent, 'box');
    var lastBoxHeight = oBoxs[oBoxs.length-1].offsetTop 
    + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
    return lastBoxHeight < (scrollTop + clientHeight);
}