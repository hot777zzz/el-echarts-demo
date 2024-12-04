<template>
  <div class="attendance-container">
    <div class="left-panel">
      <el-tree
        :data="orgTree"
        :props="defaultProps"
        @node-click="handleNodeClick"
        default-expand-all
      />
    </div>
    <div class="right-panel">
      <div class="stats-cards">
        <el-card class="stats-card">
          <div class="stats-title">项目人员情况统计</div>
          <div class="stats-number">{{ currentStats.realTime}}</div>
        </el-card>
        <el-card class="stats-card">
          <div class="stats-title">总人数</div>
          <div class="stats-number">{{ currentStats.total }}</div>
        </el-card>
        <el-card class="stats-card">
          <div class="stats-title">到岗人数</div>
          <div class="stats-number">{{ currentStats.onDuty }}</div>
        </el-card>
        <el-card class="stats-card">
          <div class="stats-title">缺勤人数</div>
          <div class="stats-number">{{ currentStats.absent }}</div>
        </el-card>
        <el-card class="stats-card">
          <div class="stats-title">迟到人数</div>
          <div class="stats-number">{{ currentStats.late }}</div>
        </el-card>
      </div>
      <div class="chart-container">
        <v-chart class="chart" :option="chartOption" autoresize />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { 
  GridComponent,
  TooltipComponent,
  LegendComponent 
} from 'echarts/components';
import { getOrgTree, getAttendanceStats, getSiteStats } from '../attendanceService';

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
]);

export default {
  name: 'AttendanceStatistics',
  components: {
    VChart,
  },
  setup() {
    //组织架构树
    const orgTree = ref([]);
    //对应统计数据
    const currentStats = ref({
      total: 0,
      onDuty: 0,
      absent: 0,
      late: 0
    });
    
    const defaultProps = {
      children: 'children',
      label: 'label'
    };

    const chartOption = ref({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['到岗人数', '缺勤人数', '迟到人数']
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '到岗人数',
          type: 'bar',
          data: []
        },
        {
          name: '缺勤人数',
          type: 'bar',
          data: []
        },
        {
          name: '迟到人数',
          type: 'bar',
          data: []
        }
      ]
    });

    const updateChart = (orgId) => {
      const siteStats = getSiteStats(orgId);
      chartOption.value.xAxis.data = siteStats.map(site => site.name);
      chartOption.value.series[0].data = siteStats.map(site => site.onDuty);
      chartOption.value.series[1].data = siteStats.map(site => site.absent);
      chartOption.value.series[2].data = siteStats.map(site => site.late);
    };

    const handleNodeClick = (node) => {
      currentStats.value = getAttendanceStats(node.id);
      updateChart(node.id);
    };

    onMounted(() => {
      orgTree.value = getOrgTree();
      // 初始化显示全部统计
      currentStats.value = getAttendanceStats('1');
      updateChart('1');
      console.log(orgTree.value);
    });

    return {
      orgTree,
      defaultProps,
      currentStats,
      chartOption,
      handleNodeClick
    };
  }
}
</script>

<style scoped>
.attendance-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  height: 100vh;
}

.left-panel {
  width: 300px;
  border-right: 1px solid #eee;
  padding-right: 20px;
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.stats-cards {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stats-card {
  flex: 1;
  text-align: center;
  /* background-color: green; */
}


.stats-title{
    font-size: 16px;
    color: #666;
}

.stats-number {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  color: #409EFF;
}

.chart-container {
  flex: 1;
  min-height: 400px;
}

.chart {
  height: 100%;
  width: 100%;
}
</style> 