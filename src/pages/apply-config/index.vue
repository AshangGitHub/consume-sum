<template>
  <div
    class="mb-4 bg-white dark:bg-slate-800 rounded-lg px-6 pt-4 ring-slate-900/5 shadow-sm"
  >
    <div class="flex justify-beween items-end">
      <div class="flex-1">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">
          <el-form-item label="应用名称">
            <el-input
              v-model="searchParams.clientName"
              :prefix-icon="Search"
              placeholder="请输入应用名称"
            />
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form-item>
          <div class="w-full flex justify-end">
            <el-button type="primary" @click="router.push('/apply-config/create')">新增</el-button>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </div>
        </el-form-item>
      </div>
    </div>
  </div>

  <div class="flex">
    <div
      class="p-4 flex-1 bg-white rounded-lg shadow dark:bg-gray-800 overflow-hidden"
    >
      <el-table class="mt-2" border :data="table.records">
        <template #empty> 数据为空 </template>
        <el-table-column label="应用图标">
          <template #default="{ row }">
            <img :src="row.clientLogo" />
          </template>
        </el-table-column>
        <el-table-column prop="clientId" label="应用编码"></el-table-column>
        <el-table-column
          prop="clientName"
          label="应用名称"
        ></el-table-column>
        <el-table-column label="应用链接" min-width="150">
          <template #default="{ row }">
            <el-button link type="text"
              ><a target="framename" :href="row.clientUrl">{{
                row.clientUrl
              }}</a></el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <!-- v-permission="'system:role:detail'" -->
            <el-button type="text" prop="id" @click="onDetail(row)"
              >查看</el-button
            >
            <!-- v-permission="'system:role:edit'" -->
            <el-button type="text" prop="id" @click="onEdit(row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="flex py-4 w-full justify-end box-border">
        <el-pagination
          v-show="table.total > 0"
          :current-page="searchParams.pageNum"
          :page-size="searchParams.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="table.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getApplyConfigList } from '@/http/apply-config';
import {
  IApplyItem,
  IGetApplyListParams,
  IGetApplyListResponse,
} from '@/interface/apply-config';
import { Search } from '@element-plus/icons-vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const searchParams = reactive<IGetApplyListParams>({
  clientName: '',
  pageNum: 1,
  pageSize: 10,
});
const table = reactive<IGetApplyListResponse>({
  current: 0,
  pages: 0,
  size: 0,
  total: 0,
  records: [],
});

const getList = async () => {
  const res = await getApplyConfigList(searchParams);
  table.records = res.records;
  table.total = res.total;
};
getList();

const onSearch = () => {
  searchParams.pageNum = 1;
  searchParams.pageSize = 10;
  getList();
};

const onDetail = (e: IApplyItem) => {
  router.push(`/apply-config/detail/${e.clientId}`);
};

const router = useRouter();
const onEdit = (e: IApplyItem) => {
  router.push(`/apply-config/edit/${e.clientId}`);
};

//分页size修改
const handleSizeChange = (val: number): void => {
  searchParams.pageNum = 1;
  searchParams.pageSize = val;
  getList();
};

//分页-页数点击
const handleCurrentChange = (val: number): void => {
  searchParams.pageNum = val;
  getList();
};
</script>

<style scoped></style>
