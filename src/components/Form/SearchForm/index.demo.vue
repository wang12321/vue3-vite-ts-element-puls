<template>
  <el-container>
    <el-header style="height: auto">
      <search-form
        :form-options="formOptions"
        :form-data="formData"
        :isAdvanced="isAdvanced"
        @submit="submit"
        @reset="reset"
      >
      </search-form>
    </el-header>

    <!--  以下是对参数添加的说明，请不要复制代码-->
    <div>
      <h3>参数说明</h3>
      <el-card class="box-card" v-for="item in tableData" :key="item.name">
        <template #header>
          <div class="card-header">
            <h3>{{ item.name }}</h3>
          </div>
        </template>
        <el-table :data="item.data" style="width: 100%">
          <el-table-column prop="parameter" label="参数" />
          <el-table-column prop="describe" label="说明" />
          <el-table-column prop="type" label="类型" />
          <el-table-column prop="default" label="默认值" />
          <el-table-column prop="mandatory" label="必填" />
        </el-table>
      </el-card>
    </div>
  </el-container>
</template>

<script lang="ts">
  import { reactive, toRefs, defineComponent, resolveComponent } from 'vue'

  export default defineComponent({
    name: 'SearchFormViews',
    setup() {
      const change = () => {
        console.log('触发事件')
      }
      // parameterData是参数说明数据，不需要复制
      const parameterData = reactive({
        tableData: [
          {
            name: 'formOptions参数说明',
            data: [
              {
                parameter: 'title',
                describe: '表单项label',
                type: 'String',
                default: '-',
                mandatory: true
              },
              {
                parameter: 'titleShow',
                describe: '表单项label是否显示，为true时显示',
                type: 'String',
                default: 'false',
                mandatory: true
              },
              {
                parameter: 'key',
                describe: '表单项model',
                type: 'String',
                default: '-',
                mandatory: true
              },
              {
                parameter: 'placeholder',
                describe: '表单项placeholder',
                type: 'String',
                default: '-',
                mandatory: false
              },
              {
                parameter: 'type',
                describe: '必传, 表单项type',
                type: 'String',
                default:
                  "['input','select','month','year','cascader','date','daterange','datetimerange','dateH',','time','datetime','radio','checkbox','inputNumber','datePicker','slot']",
                mandatory: true
              },
              {
                parameter: 'options',
                describe: 'type为select,radio时有效',
                type: 'object',
                default: '-',
                mandatory: false
              },
              {
                parameter: 'label',
                describe: 'type为select,radio时有效，option label',
                type: 'String',
                default: '-',
                mandatory: false
              },
              {
                parameter: 'value',
                describe: 'type为select,radio时有效，option value',
                type: 'String',
                default: '-',
                mandatory: false
              },
              {
                parameter: 'width',
                describe: '设置input宽度',
                type: 'String',
                default: '-',
                mandatory: false
              },
              {
                parameter: 'isAdvanced',
                describe: '当mode为normal时有效，为true时显示在高级搜索外面',
                type: 'Boolean',
                default: 'false',
                mandatory: false
              },
              {
                parameter: 'hidden',
                describe: '是否显示当前表单项',
                type: 'Boolean',
                default: 'false',
                mandatory: false
              },
              {
                parameter: 'change',
                describe: '@change回调事件 附件可以在这个方法中处理绑定',
                type: 'Function',
                default: '-',
                mandatory: false
              },
              {
                parameter: 'activeText',
                describe: 'type为switch时有效',
                type: 'String',
                default: '-',
                mandatory: false
              },
              {
                parameter: 'inactiveText',
                describe: 'type为switch时有效',
                type: 'String',
                default: '-',
                mandatory: false
              },
              {
                parameter: 'min',
                describe: 'type为inputNumber时有效',
                type: 'String',
                default: '-',
                mandatory: false
              },
              {
                parameter: 'max',
                describe: 'type为inputNumber时有效',
                type: 'String',
                default: '-',
                mandatory: false
              },
              {
                parameter: 'border',
                describe: 'checkbox 有效',
                type: 'Boolean',
                default: '-',
                mandatory: false
              },
              {
                parameter: 'disabled',
                describe: 'disabled 默认关闭',
                type: 'Boolean',
                default: 'false',
                mandatory: false
              }
            ]
          },
          {
            name: 'Methods参数说明',
            data: [
              {
                parameter: 'reset',
                describe: '重置按钮',
                type: 'Function',
                default: '-',
                mandatory: false
              },
              {
                parameter: 'submit',
                describe: '提交按钮',
                type: 'Function',
                default: '-',
                mandatory: false
              }
            ]
          }
        ]
      })
      const state = reactive({
        modelValue: '',
        formData: {
          number: 50,
          sex: '男',
          region: ['中国']
        },
        isAdvanced: true,
        formOptions: [
          { title: '昵称', key: 'name', typeC: 'input', clearable: true, isAdvanced: true },
          {
            titleShow: true,
            clearable: true,
            title: '是否',
            key: 'yes',
            typeC: 'select',
            options: [
              { value: '1', label: '是' },
              { value: '2', label: '否' }
            ],
            label: 'label',
            value: 'value',
            change: change
          },
          { titleShow: true, clearable: true, title: '年份', key: 'year', typeC: 'year' },
          { titleShow: true, clearable: true, title: '日期', key: 'date', typeC: 'date' },
          { titleShow: true, clearable: true, title: '时间', key: 'time', typeC: 'time' },
          {
            titleShow: true,
            clearable: true,
            title: '性别',
            key: 'sex',
            typeC: 'radio',
            options: [
              { value: '1', label: '男' },
              { value: '2', label: '女' }
            ],
            label: 'label',
            value: 'value'
          },
          {
            border: true,
            titleShow: true,
            clearable: true,
            title: '地区',
            key: 'region',
            typeC: 'checkbox',
            options: [
              { value: '1', label: '中国' },
              { value: '2', label: '德国' }
            ],
            label: 'label',
            value: 'value'
          },
          {
            titleShow: true,
            clearable: true,
            title: '数量',
            key: 'number',
            typeC: 'inputNumber',
            min: 0,
            max: 100
          },
          {
            titleShow: true,
            clearable: true,
            title: '开关',
            key: 'switch',
            typeC: 'switch',
            inactiveText: '未选中',
            activeText: '选中'
          },
          {
            title: '名称',
            key: 'aas',
            typeC: 'slot',
            placeholder: '请输入内容',
            isAdvanced: true,
            render: (h: any, parms: any) => {
              const elInput = resolveComponent('el-input')
              return h(elInput, {
                type: 'text',
                placeholder: parms.item.placeholder,
                modelValue: state.modelValue,
                onInput: (value: string) => {
                  state.modelValue = value
                }
              })
            }
          }
        ],
        submit() {
          console.log(state.formData)
          alert('查询了')
        },
        reset() {
          state.formData = {
            number: 50,
            sex: '男',
            region: ['中国']
          }
        }
      })
      return {
        change,
        ...toRefs(state),
        ...toRefs(parameterData)
      }
    }
  })
</script>

<style scoped></style>
