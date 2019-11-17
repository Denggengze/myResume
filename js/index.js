$(document).on('touchstart touchmove touchend', function (ev) {
    ev.preventDefault();
});

let swiperModule = (function () {
    let swiperExample = null,
        $baseInfo = $('.baseInfo');
    //MAKISU的基础配置

    function pageMove() {
        let activeIndex = this.activeIndex,
            slides = this.slides;
        if (activeIndex === 1) {
            $baseInfo.makisu({
                selector: 'dd',
                overlap: 0.6,
                speed: 0.8
            });
            $baseInfo.makisu('open');
        } else {
            $baseInfo.makisu({
                selector: 'dd',
                overlap: 0,
                speed: 0
            });
            $baseInfo.makisu('close');
        }

        [].forEach.call(slides, (item, index) => {
            if (index === activeIndex) {
                item.id = 'page' + (activeIndex + 1);
                return;
            }
            item.id = null;
        })
    };
    return {
        init(index = 0) {
            swiperExample = new Swiper('.swiper-container', {
                initialSlide: index,
                direction: 'vertical',
                effect: 'coverflow',
                on: {
                    init: pageMove,//触发成功时做
                    transitionEnd: pageMove//切换回来后做
                }
            });
            swiperExample.slideTo(index, 1);
        }
    }
})();
swiperModule.init();

/* function handleMusic() {
    let $musicAudio = $('.musicAudio'),
        musicAudio = $musicAudio[0],
        $musicIcon = $('.musicIcon');
        console.dir($musicAudio)

    $musicAudio.on('canplay', function () {
        $musicIcon.css('display','block').addClass('move');
        console.log('ok')
    });
    console.log('ok')
    $musicIcon.tap(function () {
        if (musicAudio.paused) {
            play();
            $musicIcon.addClass('move');
            return;
        }
        musicAudio.pause();
        $musicIcon.removeClass('move');
    });
    function play() {
        musicAudio.play();
        document.removeEventListener('touchstart', play);
    };
    play();

    //兼容处理
    document.addEventListener('WeixinJSBridgeReady', play);
    document.addEventListener('YixinJSBridgeReady', play);
    document.addEventListener('touchstart', play);

}
setTimeout(handleMusic, 1000); */

function handleMusic() {
	let $musicAudio = $('.musicAudio'),
		musicAudio = $musicAudio[0],
		$musicIcon = $('.musicIcon');

	$musicAudio.on('canplay', function () {
		$musicIcon.css('display', 'block')
			.addClass('move');
	});

	$musicIcon.tap(function () {
		if (musicAudio.paused) {
			//=>当前暂停状态
			play();
			$musicIcon.addClass('move');
			return;
		}
		//=>当前播放状态
		musicAudio.pause();
		$musicIcon.removeClass('move');
	});

	function play() {
		musicAudio.play();
		document.removeEventListener("touchstart", play);
	}
	play();

	//=>兼容处理
	document.addEventListener("WeixinJSBridgeReady", play);
	document.addEventListener("YixinJSBridgeReady", play);
	document.addEventListener("touchstart", play);
}
setTimeout(handleMusic, 1000);