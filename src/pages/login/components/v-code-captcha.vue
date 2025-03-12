<template>
  <!-- 本体部分 -->
  <div
    :class="['vue-puzzle-vcode', { show_: show }]"
    @mousedown="onCloseMouseDown"
    @mouseup="onCloseMouseUp"
    @touchstart="onCloseMouseDown"
    @touchend="onCloseMouseUp"
  >
    <div class="vue-auth-box_" @mousedown.stop @touchstart.stop>
      <div class="auth-body_" :style="`height: ${canvasHeight}px`">
        <!-- 主图，有缺口 -->
        <canvas
          ref="canvas1"
          :width="canvasWidth"
          :height="canvasHeight"
          :style="`width:${canvasWidth}px;height:${canvasHeight}px`"
        />
        <!-- 成功后显示的完整图 -->
        <canvas
          ref="canvas3"
          :class="['auth-canvas3_', { show: isSuccess }]"
          :width="canvasWidth"
          :height="canvasHeight"
          :style="`width:${canvasWidth}px;height:${canvasHeight}px`"
        />
        <!-- 小图 -->
        <canvas
          :width="puzzleBaseSize"
          class="auth-canvas2_"
          :height="canvasHeight"
          ref="canvas2"
          :style="`width:${puzzleBaseSize}px;height:${canvasHeight}px;transform:translateX(${
            styleWidth -
            sliderBaseSize -
            (puzzleBaseSize - sliderBaseSize) *
              ((styleWidth - sliderBaseSize) / (canvasWidth - sliderBaseSize))
          }px)`"
        />
        <div :class="['loading-box_', { hide_: !loading }]">
          <div class="loading-gif_">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div
          :class="['info-box_', { show: infoBoxShow }, { fail: infoBoxFail }]"
        >
          {{ infoText }}
        </div>
        <div
          :class="['flash_', { show: isSuccess }]"
          :style="`transform: translateX(${
            isSuccess
              ? `${canvasWidth + canvasHeight * 0.578}px`
              : `-${canvasHeight * 0.578}px`
          }) skew(-30deg, 0);`"
        ></div>
        <img ref="resetSvgRef" class="reset_" @click="reset" :src="resetSvg" />
      </div>
      <div class="auth-control_">
        <div class="range-box" :style="`height:${sliderBaseSize}px`">
          <div class="range-text">{{ sliderText }}</div>
          <div
            class="range-slider"
            ref="rangeSlider"
            :style="`width:${styleWidth}px`"
          >
            <div
              :class="['range-btn', { isDown: mouseDown }]"
              :style="`width:${sliderBaseSize}px`"
              @mousedown="onRangeMouseDown($event)"
              @touchstart="onRangeMouseDown($event)"
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import resetSvg from './assets/reset.png';

interface Props {
  canvasWidth: number; // 主canvas的宽
  canvasHeight: number; // 主canvas的高
  // 是否出现，由父级控制
  show: boolean;
  puzzleScale: number; // 拼图块的大小缩放比例
  sliderSize: number; // 滑块的大小
  range: number; // 允许的偏差值
  // 所有的背景图片
  imgs: string[];
  successText: string;
  failText: string;
  sliderText: string;
}
const props = withDefaults(defineProps<Props>(), {
  show: false,
  canvasWidth: 310,
  canvasHeight: 160,
  puzzleScale: 1,
  sliderSize: 50,
  range: 10,
  // @ts-ignore
  imgs: [],
  successText: '验证通过！',
  failText: '验证失败，请重试',
  sliderText: '拖动滑块完成拼图',
});

const mouseDown = ref(false);
const startWidth = ref(50);
const startX = ref(0);
const newX = ref(0);
const pinX = ref(0);
const pinY = ref(0);
const loading = ref(false);
const isCanSlide = ref(false);
const infoBoxShow = ref(false);
const infoText = ref('');
const infoBoxFail = ref(false);
const timer1 = ref(null);
const closeDown = ref(false);
const isSuccess = ref(false);
const imgIndex = ref(-1);
const isSubmting = ref(false);
const resetSvgRef = ref(null);

onMounted(() => {
  const dom = document.querySelector('.vue-puzzle-vcode');
  document.body.appendChild(dom as Element);
  document.addEventListener('mousemove', onRangeMouseMove, false);
  document.addEventListener('mouseup', onRangeMouseUp, false);
  // @ts-ignore
  document.addEventListener('touchmove', onRangeMouseMove, {
    passive: false,
  });
  document.addEventListener('touchend', onRangeMouseUp, false);
  if (props.show) {
    document.body.classList.add('vue-puzzle-overflow');
    reset();
  }
});

watch(
  () => props.show,
  (val: boolean) => {
    if (val) {
      document.body.classList.add('vue-puzzle-overflow');
      reset();
    } else {
      isSubmting.value = false;
      isSuccess.value = false;
      infoBoxShow.value = false;
      document.body.classList.remove('vue-puzzle-overflow');
    }
  }
);

// 处理一下sliderSize，弄成整数，以免计算有偏差
const sliderBaseSize = computed((): number => {
  return Math.max(
    Math.min(Math.round(props.sliderSize), Math.round(props.canvasWidth * 0.5)),
    10
  );
});

const puzzleBaseSize = computed(() => {
  return Math.round(Math.max(Math.min(props.puzzleScale, 2), 0.2) * 52.5 + 6);
});

const styleWidth = computed((): number => {
  const w = startWidth.value + newX.value - startX.value;
  return w < sliderBaseSize.value
    ? sliderBaseSize.value
    : w > props.canvasWidth
    ? props.canvasWidth
    : w;
});

const emits = defineEmits<{
  (e: 'success'): void;
  (e: 'fail'): void;
  (e: 'close'): void;
}>();

const onClose = () => {
  if (!mouseDown.value) {
    // @ts-ignore
    clearTimeout(timer1.value);
    emits('close');
  }
};

const onCloseMouseDown = () => {
  closeDown.value = true;
};
const onCloseMouseUp = () => {
  if (closeDown.value) {
    onClose();
  }
  closeDown.value = false;
};
// 鼠标按下准备拖动
const rangeSlider = ref(null);
// @ts-ignore
const onRangeMouseDown = (e) => {
  if (isCanSlide.value) {
    mouseDown.value = true;
    // @ts-ignore
    startWidth.value = rangeSlider.value.clientWidth;
    newX.value = e.clientX || e.changedTouches[0].clientX;
    startX.value = e.clientX || e.changedTouches[0].clientX;
  }
};
// 鼠标移动
const onRangeMouseMove = (e: MouseEvent) => {
  if (mouseDown.value) {
    e.preventDefault();
    // @ts-ignore
    newX.value = e.clientX || e.changedTouches[0].clientX;
  }
};

// 鼠标抬起
const onRangeMouseUp = () => {
  if (mouseDown.value) {
    mouseDown.value = false;
    submit();
  }
};

const canvas1 = ref<HTMLCanvasElement | null>(null);
const canvas2 = ref<HTMLCanvasElement | null>(null);
const canvas3 = ref<HTMLCanvasElement | null>(null);
/**
 * 开始进行
 * @param withCanvas 是否强制使用canvas随机作图
 */
// @ts-ignore
const init = (withCanvas) => {
  // 防止重复加载导致的渲染错误
  if (loading.value && !withCanvas) {
    return;
  }
  loading.value = true;
  isCanSlide.value = false;
  const c = canvas1;
  const c2 = canvas2;
  const c3 = canvas3;
  const ctx = (c.value as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
  const ctx2 = (c2.value as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
  const ctx3 = (c3.value as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
  const isFirefox =
    navigator.userAgent.indexOf('Firefox') >= 0 &&
    navigator.userAgent.indexOf('Windows') >= 0; // 是windows版火狐
  const img = document.createElement('img');
  ctx.fillStyle = 'rgba(255,255,255,1)';
  ctx3.fillStyle = 'rgba(255,255,255,1)';
  ctx.clearRect(0, 0, props.canvasWidth, props.canvasHeight);
  ctx2.clearRect(0, 0, props.canvasWidth, props.canvasHeight);
  // 取一个随机坐标，作为拼图块的位置
  pinX.value = getRandom(
    puzzleBaseSize.value,
    props.canvasWidth - puzzleBaseSize.value - 20
  ); // 留20的边距
  pinY.value = getRandom(20, props.canvasHeight - puzzleBaseSize.value - 20); // 主图高度 - 拼图块自身高度 - 20边距
  img.crossOrigin = 'anonymous'; // 匿名，想要获取跨域的图片
  img.onload = () => {
    const [x, y, w, h] = makeImgSize(img);
    ctx.save();
    // 先画小图
    paintBrick(ctx);
    ctx.closePath();
    if (!isFirefox) {
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowColor = '#000';
      ctx.shadowBlur = 3;
      ctx.fill();
      ctx.clip();
    } else {
      ctx.clip();
      ctx.save();
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowColor = '#000';
      ctx.shadowBlur = 3;
      ctx.fill();
      ctx.restore();
    }
    ctx.drawImage(img, x, y, w, h);
    ctx3.fillRect(0, 0, props.canvasWidth, props.canvasHeight);
    ctx3.drawImage(img, x, y, w, h);
    // 设置小图的内阴影
    ctx.globalCompositeOperation = 'source-atop';
    paintBrick(ctx);
    ctx.arc(
      pinX.value + Math.ceil(puzzleBaseSize.value / 2),
      pinY.value + Math.ceil(puzzleBaseSize.value / 2),
      puzzleBaseSize.value * 1.2,
      0,
      Math.PI * 2,
      true
    );
    ctx.closePath();
    ctx.shadowColor = 'rgba(255, 255, 255, .8)';
    ctx.shadowOffsetX = -1;
    ctx.shadowOffsetY = -1;
    ctx.shadowBlur = Math.min(Math.ceil(8 * props.puzzleScale), 12);
    ctx.fillStyle = '#ffffaa';
    ctx.fill();
    // 将小图赋值给ctx2
    const imgData = ctx.getImageData(
      pinX.value - 3, // 为了阴影 是从-3px开始截取，判定的时候要+3px
      pinY.value - 20,
      pinX.value + puzzleBaseSize.value + 5,
      pinY.value + puzzleBaseSize.value + 5
    );
    ctx2.putImageData(imgData, 0, pinY.value - 20);
    console.log('pinY.value', pinY.value);

    // ctx2.drawImage(c, pinX.value - 3,pinY.value - 20,pinX.value + puzzleBaseSize + 5,pinY.value + puzzleBaseSize + 5,
    // 0, pinY.value - 20, pinX.value + puzzleBaseSize + 5, pinY.value + puzzleBaseSize + 5);
    // 清理
    ctx.restore();
    ctx.clearRect(0, 0, props.canvasWidth, props.canvasHeight);
    // 画缺口
    ctx.save();
    paintBrick(ctx);
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.restore();
    // 画缺口的内阴影
    ctx.save();
    ctx.globalCompositeOperation = 'source-atop';
    paintBrick(ctx);
    ctx.arc(
      pinX.value + Math.ceil(puzzleBaseSize.value / 2),
      pinY.value + Math.ceil(puzzleBaseSize.value / 2),
      puzzleBaseSize.value * 1.2,
      0,
      Math.PI * 2,
      true
    );
    ctx.shadowColor = '#000';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.restore();
    // 画整体背景图
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(img, x, y, w, h);
    ctx.restore();
    loading.value = false;
    isCanSlide.value = true;
  };
  img.onerror = () => {
    init(true); // 如果图片加载错误就重新来，并强制用canvas随机作图
  };
  if (!withCanvas && props.imgs && props.imgs.length) {
    let randomNum = getRandom(0, props.imgs.length - 1);
    if (randomNum === imgIndex.value) {
      if (randomNum === props.imgs.length - 1) {
        randomNum = 0;
      } else {
        randomNum++;
      }
    }
    imgIndex.value = randomNum;
    img.src = props.imgs[randomNum];
  } else {
    img.src = makeImgWithCanvas();
  }
};
// 工具 - 范围随机数
const getRandom = (min: number, max: number) => {
  return Math.ceil(Math.random() * (max - min) + min);
};
// 工具 - 设置图片尺寸cover方式贴合canvas尺寸 w/h
const makeImgSize = (img: any) => {
  const imgScale = img.width / img.height;
  const canvasScale = props.canvasWidth / props.canvasHeight;
  let x = 0,
    y = 0,
    w = 0,
    h = 0;
  if (imgScale > canvasScale) {
    h = props.canvasHeight;
    w = imgScale * h;
    y = 0;
    x = (props.canvasWidth - w) / 2;
  } else {
    w = props.canvasWidth;
    h = w / imgScale;
    x = 0;
    y = (props.canvasHeight - h) / 2;
  }
  return [x, y, w, h];
};
// 绘制拼图块的路径
const paintBrick = (ctx: any) => {
  const moveL = Math.ceil(15 * props.puzzleScale); // 直线移动的基础距离
  ctx.beginPath();
  ctx.moveTo(pinX.value, pinY.value);
  ctx.lineTo(pinX.value + moveL, pinY.value);
  ctx.arcTo(
    pinX.value + moveL,
    pinY.value - moveL / 2,
    pinX.value + moveL + moveL / 2,
    pinY.value - moveL / 2,
    moveL / 2
  );
  ctx.arcTo(
    pinX.value + moveL + moveL,
    pinY.value - moveL / 2,
    pinX.value + moveL + moveL,
    pinY.value,
    moveL / 2
  );
  ctx.lineTo(pinX.value + moveL + moveL + moveL, pinY.value);
  ctx.lineTo(pinX.value + moveL + moveL + moveL, pinY.value + moveL);
  ctx.arcTo(
    pinX.value + moveL + moveL + moveL + moveL / 2,
    pinY.value + moveL,
    pinX.value + moveL + moveL + moveL + moveL / 2,
    pinY.value + moveL + moveL / 2,
    moveL / 2
  );
  ctx.arcTo(
    pinX.value + moveL + moveL + moveL + moveL / 2,
    pinY.value + moveL + moveL,
    pinX.value + moveL + moveL + moveL,
    pinY.value + moveL + moveL,
    moveL / 2
  );
  ctx.lineTo(
    pinX.value + moveL + moveL + moveL,
    pinY.value + moveL + moveL + moveL
  );
  ctx.lineTo(pinX.value, pinY.value + moveL + moveL + moveL);
  ctx.lineTo(pinX.value, pinY.value + moveL + moveL);
  ctx.arcTo(
    pinX.value + moveL / 2,
    pinY.value + moveL + moveL,
    pinX.value + moveL / 2,
    pinY.value + moveL + moveL / 2,
    moveL / 2
  );
  ctx.arcTo(
    pinX.value + moveL / 2,
    pinY.value + moveL,
    pinX.value,
    pinY.value + moveL,
    moveL / 2
  );
  ctx.lineTo(pinX.value, pinY.value);
};
// 用canvas随机生成图片
const makeImgWithCanvas = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  canvas.width = props.canvasWidth;
  canvas.height = props.canvasHeight;
  ctx.fillStyle = `rgb(${getRandom(100, 255)},${getRandom(
    100,
    255
  )},${getRandom(100, 255)})`;
  ctx.fillRect(0, 0, props.canvasWidth, props.canvasHeight);
  // 随机画10个图形
  for (let i = 0; i < 12; i++) {
    ctx.fillStyle = `rgb(${getRandom(100, 255)},${getRandom(
      100,
      255
    )},${getRandom(100, 255)})`;
    ctx.strokeStyle = `rgb(${getRandom(100, 255)},${getRandom(
      100,
      255
    )},${getRandom(100, 255)})`;
    if (getRandom(0, 2) > 1) {
      // 矩形
      ctx.save();
      ctx.rotate((getRandom(-90, 90) * Math.PI) / 180);
      ctx.fillRect(
        getRandom(-20, canvas.width - 20),
        getRandom(-20, canvas.height - 20),
        getRandom(10, canvas.width / 2 + 10),
        getRandom(10, canvas.height / 2 + 10)
      );
      ctx.restore();
    } else {
      // 圆
      ctx.beginPath();
      const ran = getRandom(-Math.PI, Math.PI);
      ctx.arc(
        getRandom(0, canvas.width),
        getRandom(0, canvas.height),
        getRandom(10, canvas.height / 2 + 10),
        ran,
        ran + Math.PI * 1.5
      );
      ctx.closePath();
      ctx.fill();
    }
  }
  return canvas.toDataURL('image/png');
};
// 开始判定
const submit = () => {
  isSubmting.value = true;
  // 偏差 x = puzzle的起始X - (用户真滑动的距离) + (puzzle的宽度 - 滑块的宽度) * （用户真滑动的距离/canvas总宽度）
  // 最后+ 的是补上slider和滑块宽度不一致造成的缝隙
  const x = Math.abs(
    pinX.value -
      (styleWidth.value - sliderBaseSize.value) +
      (puzzleBaseSize.value - sliderBaseSize.value) *
        ((styleWidth.value - sliderBaseSize.value) /
          (props.canvasWidth - sliderBaseSize.value)) -
      3
  );
  if (x < props.range) {
    // 成功
    infoText.value = props.successText;
    infoBoxFail.value = false;
    infoBoxShow.value = true;
    isCanSlide.value = false;
    isSuccess.value = true;
    // 成功后准备关闭
    // @ts-ignore
    clearTimeout(timer1.value);
    // @ts-ignore
    timer1.value = setTimeout(() => {
      // 成功的回调
      isSubmting.value = false;
      emits('success');
    }, 800);
  } else {
    // 失败
    infoText.value = props.failText;
    infoBoxFail.value = true;
    infoBoxShow.value = true;
    isCanSlide.value = false;
    // 失败的回调
    emits('fail');
    // 800ms后重置
    // @ts-ignore
    clearTimeout(timer1.value);
    // @ts-ignore
    timer1.value = setTimeout(() => {
      isSubmting.value = false;
      reset();
    }, 800);
  }
};
// 重置 - 重新设置初始状态
const resetState = () => {
  infoBoxFail.value = false;
  infoBoxShow.value = false;
  isCanSlide.value = false;
  isSuccess.value = false;
  // startWidth = sliderBaseSize; // 鼠标点下去时父级的width
  startX.value = 0; // 鼠标按下时的X
  newX.value = 0; // 鼠标当前的偏移X
};
// 重置
const reset = () => {
  if (isSubmting.value) {
    return;
  }
  resetState();
  init(false);
};
</script>
<style lang="scss">
.vue-puzzle-vcode {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms;
  &.show_ {
    opacity: 1;
    pointer-events: auto;
  }
}
.vue-auth-box_ {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: #fff;
  user-select: none;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  .auth-body_ {
    position: relative;
    overflow: hidden;
    border-radius: 3px;
    .loading-box_ {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 20;
      opacity: 1;
      transition: opacity 200ms;
      display: flex;
      align-items: center;
      justify-content: center;
      &.hide_ {
        opacity: 0;
        pointer-events: none;
        .loading-gif_ {
          span {
            animation-play-state: paused;
          }
        }
      }
      .loading-gif_ {
        flex: none;
        height: 5px;
        line-height: 0;
        @keyframes load {
          0% {
            opacity: 1;
            transform: scale(1.3);
          }
          100% {
            opacity: 0.2;
            transform: scale(0.3);
          }
        }
        span {
          display: inline-block;
          width: 5px;
          height: 100%;
          margin-left: 2px;
          border-radius: 50%;
          background-color: #888;
          animation: load 1.04s ease infinite;
          &:nth-child(1) {
            margin-left: 0;
          }
          &:nth-child(2) {
            animation-delay: 0.13s;
          }
          &:nth-child(3) {
            animation-delay: 0.26s;
          }
          &:nth-child(4) {
            animation-delay: 0.39s;
          }
          &:nth-child(5) {
            animation-delay: 0.52s;
          }
        }
      }
    }
    .info-box_ {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 24px;
      line-height: 24px;
      text-align: center;
      overflow: hidden;
      font-size: 13px;
      background-color: #83ce3f;
      opacity: 0;
      transform: translateY(24px);
      transition: all 200ms;
      color: #fff;
      z-index: 10;
      &.show {
        opacity: 0.95;
        transform: translateY(0);
      }
      &.fail {
        background-color: #ce594b;
      }
    }
    .auth-canvas2_ {
      position: absolute;
      top: 0;
      left: 0;
      width: 60px;
      height: 100%;
      z-index: 2;
    }
    .auth-canvas3_ {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      transition: opacity 600ms;
      z-index: 3;
      &.show {
        opacity: 1;
      }
    }
    .flash_ {
      position: absolute;
      top: 0;
      left: 0;
      width: 30px;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.1);
      z-index: 3;
      &.show {
        transition: transform 600ms;
      }
    }
    .reset_ {
      position: absolute;
      top: 2px;
      right: 2px;
      width: 35px;
      height: auto;
      z-index: 12;
      cursor: pointer;
      transition: transform 200ms;
      transform: rotate(0deg);
      &:hover {
        transform: rotate(-90deg);
      }
    }
  }
  .auth-control_ {
    .range-box {
      position: relative;
      width: 100%;
      background-color: #eef1f8;
      margin-top: 20px;
      border-radius: 3px;
      box-shadow: 0 0 8px rgba(240, 240, 240, 0.6) inset;
      .range-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 14px;
        color: #b7bcd1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        width: 100%;
      }
      .range-slider {
        position: absolute;
        height: 100%;
        width: 50px;
        background-color: rgba(106, 160, 255, 0.8);
        border-radius: 3px;
        .range-btn {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          right: 0;
          width: 50px;
          height: 100%;
          background-color: #fff;
          border-radius: 3px;
          box-shadow: 0 0 4px #ccc;
          cursor: pointer;
          & > div {
            width: 0;
            height: 40%;
            transition: all 200ms;
            &:nth-child(2) {
              margin: 0 4px;
            }
            border: solid 1px #6aa0ff;
          }
          &:hover,
          &.isDown {
            & > div:first-child {
              border: solid 4px transparent;
              height: 0;
              border-right-color: #6aa0ff;
            }
            & > div:nth-child(2) {
              border-width: 3px;
              height: 0;
              border-radius: 3px;
              margin: 0 6px;
              border-right-color: #6aa0ff;
            }
            & > div:nth-child(3) {
              border: solid 4px transparent;
              height: 0;
              border-left-color: #6aa0ff;
            }
          }
        }
      }
    }
  }
}
.vue-puzzle-overflow {
  overflow: hidden !important;
}
</style>
