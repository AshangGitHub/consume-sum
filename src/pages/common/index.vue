<!-- <template>
  <remote-index></remote-index>
</template> -->
<template>
  <div class="w-screen min-h-screen flex items-center justify-center">
    <div class="w-full xl:w-1/2 text-gray-600 px-2 py-2 md:my-4 md:px-5">
      <el-card class="w-full px-0 md:px-2" shadow="always">
        <h2 class="hello text-center text-xl mb-4">水电燃费用计算</h2>
        <div class="flex items-center mb-4">
          <h3 class="mr-4">资费标准</h3>
          <el-button type="primary" @click="handleReset">重置标准</el-button>
        </div>
        <div class="mb-4">
          <el-form ref="ruleFormRef" :model="baseFee" status-icon>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-10">
              <el-form-item label="水费" prop="water">
                <el-input-number class="flex-1" :min="0.1" v-model="baseFee.water">
                  <template #suffix>
                    <span>元/吨</span>
                  </template>
                </el-input-number>
              </el-form-item>
              <el-form-item label="电费" prop="electricity">
                <el-input-number class="flex-1" :min="0.01" v-model="baseFee.electricity">
                  <template #suffix>
                    <span>元/度</span>
                  </template>
                </el-input-number>
              </el-form-item>
              <el-form-item label="燃气费" prop="gas">
                <el-input-number class="flex-1" :min="0.01" v-model="baseFee.gas">
                  <template #suffix>
                    <span>元/立方</span>
                  </template>
                </el-input-number>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="flex items-center mb-4">
          <h3 class="mr-4">上次使用</h3>
        </div>
        <div class="mb-4">
          <el-form ref="ruleFormRef2" :model="lastTimeFee" status-icon>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-10">
              <el-form-item label="水表" prop="water">
                <el-input-number class="flex-1" :min="0" v-model="lastTimeFee.water">
                  <template #suffix>
                    <span>吨</span>
                  </template>
                </el-input-number>
              </el-form-item>
              <el-form-item label="电表" prop="electricity">
                <el-input-number class="flex-1"  :min="0" v-model="lastTimeFee.electricity">
                  <template #suffix>
                    <span>度</span>
                  </template>
                </el-input-number>
              </el-form-item>
              <el-form-item label="燃气表" prop="gas">
                <el-input-number class="flex-1" :min="0" v-model="lastTimeFee.gas">
                  <template #suffix>
                    <span>立方</span>
                  </template>
                </el-input-number>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="flex items-center mb-4">
          <h3 class="mr-4">本次使用</h3>
        </div>
        <div class="mb-4">
          <el-form ref="ruleFormRef3" :model="currentFee" status-icon>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-10">
              <el-form-item label="水表" prop="water">
                <el-input-number class="flex-1" :min="0" v-model="currentFee.water">
                  <template #suffix>
                    <span>吨</span>
                  </template>
                </el-input-number>
              </el-form-item>
              <el-form-item label="电表" prop="electricity">
                <el-input-number class="flex-1"  :min="0" v-model="currentFee.electricity">
                  <template #suffix>
                    <span>度</span>
                  </template>
                </el-input-number>
              </el-form-item>
              <el-form-item label="燃气表" prop="gas">
                <el-input-number class="flex-1" :min="0" v-model="currentFee.gas">
                  <template #suffix>
                    <span>立方</span>
                  </template>
                </el-input-number>
              </el-form-item>
            </div>
          </el-form>
          <el-button class="w-full sm:w-auto mx-auto" type="primary" @click="handleSave">保存至本地记录</el-button>
        </div>
        <div class="flex items-center mb-1">
          <h3 class="mr-4">差值</h3>
        </div>
        <div class="mb-4">
          <el-form ref="ruleFormRef3" :model="currentFee" status-icon>
            <div class="grid grid-cols-3 gap-0 md:gap-10">
                <el-form-item label="水表" prop="water">
                <span class="text-primary text-lg">{{currentFee.water - lastTimeFee.water}}</span>
              </el-form-item>
              <el-form-item label="电表" prop="electricity">
                <span class="text-primary text-lg">{{currentFee.electricity - lastTimeFee.electricity}}</span>
              </el-form-item>
              <el-form-item label="燃气表" prop="gas">
                <span class="text-primary text-lg">{{currentFee.gas - lastTimeFee.gas}}</span>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="flex items-center">
          <h3 class="mr-4 text-primary">费用计算</h3>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-2 mt-4">
          <div class="flex items-center">
            <span class="text-gray-600 text-sm ">水费：</span>
            <span class="text-primary font-medium text-lg md:text-xl ">{{waterMoney}}元</span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-600 text-sm ">电费：</span>
            <span class="text-primary font-medium text-lg md:text-xl">{{electricityMoney}}元</span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-600 text-sm">燃气费：</span>
            <span class="text-primary font-medium text-lg md:text-xl ">{{gasMoney}}元</span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-600 text-sm leading-9">总计：</span>
            <span class="text-primary font-medium text-xl md:text-2xl ">{{sumMoney}}元</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
const BASE_FEE = {
  water: 3.3,
  electricity: 0.58,
  gas: 0.25,
};

const lastTimeFee = ref({
  water: 0,
  electricity: 0,
  gas: 0,
});

const currentFee = ref({
  water: 0,
  electricity: 0,
  gas: 0,
});

const baseFee = ref(BASE_FEE);

const waterMoney = computed(() => {
  const money = baseFee.value.water * (currentFee.value.water - lastTimeFee.value.water);
  return money.toFixed(2);
});

const electricityMoney = computed(() => {
  const money = baseFee.value.electricity * (currentFee.value.electricity - lastTimeFee.value.electricity);
  return money.toFixed(2);
});

const gasMoney = computed(() => {
  const money = baseFee.value.gas * (currentFee.value.gas - lastTimeFee.value.gas);
  return money.toFixed(2);
});

const sumMoney = computed(() => {
  const money = parseFloat(waterMoney.value) + parseFloat(electricityMoney.value) + parseFloat(gasMoney.value);
  return money.toFixed(2);
});

const handleReset = () => {
  baseFee.value = JSON.parse(JSON.stringify(BASE_FEE));
  // console.log(baseFee.value);
  ElMessage.success('重置成功');
};
const handleSave = () => {
  localStorage.setItem('historyFee', JSON.stringify(currentFee.value));
  ElMessage.success('保存成功');
};

(()=>{
  const historyFee = localStorage.getItem('historyFee');
  if(historyFee){
    lastTimeFee.value = JSON.parse(historyFee);
    currentFee.value = JSON.parse(historyFee);
  }
})();
</script>

<style lang="scss" scoped>
.hello {
  font-weight: bold;
  background: linear-gradient(to right, #0fb8b2, #7bd8d5);
  background-clip: text;
  letter-spacing: 2px;
  color: transparent;
}
</style>
