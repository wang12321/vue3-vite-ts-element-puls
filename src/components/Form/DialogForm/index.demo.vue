<template>
  <el-button @click="editSome" type="primary" style="margin: 20px">新增一列</el-button>
  <el-dialog v-model="visible" title="对话框标题" width="80%">
    <dialog-form
      :form-list="formList"
      :form-data="formData"
      :rules="rules"
      @submit="submit"
      @CANCEL="CANCEL"
    >
    </dialog-form>
  </el-dialog>

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
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, resolveComponent } from 'vue'
  export default defineComponent({
    name: 'DialogForm.demo',
    setup() {
      // parameterData是参数说明数据，不需要复制
      const parameterData = reactive({
        tableData: [
          {
            name: 'formList参数说明',
            data: [
              {
                parameter: 'title',
                describe: '表单项label',
                type: 'String',
                default: '-',
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
                  "['input','select','month','year',','cascader','date','daterange','datetimerange','dateH','dataNo','time','datetime','radio','checkbox','inputNumber','switch','uploadImg','slot']",
                mandatory: true
              },
              {
                parameter: 'width',
                describe: '设置input宽度',
                type: 'String',
                default: '-',
                mandatory: false
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
              },
              {
                parameter: 'limit',
                describe: 'uploadImg有效 最大允许上传个数',
                type: 'number',
                default: '-',
                mandatory: false
              }
            ]
          },
          {
            name: 'Methods参数说明',
            data: [
              {
                parameter: 'CANCEL',
                describe: '关闭按钮',
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
        visible: false,
        rules: {},
        formData: {
          name: '123'
        },
        formList: [
          { title: '昵称', key: 'name', maxlength: '30', typeC: 'input', clearable: true },
          { title: '用户', key: 'user', typeC: 'input', clearable: true, disabled: true },
          {
            clearable: true,
            title: '是否',
            key: 'yes',
            typeC: 'selectID',
            width: '500px',
            options: [
              { value: '1', label: '是' },
              { value: '2', label: '否' }
            ],
            label: 'label',
            value: 'value'
          },
          { clearable: true, title: '年份', key: 'year', typeC: 'year' },
          { clearable: true, title: '日期', key: 'date', typeC: 'date' },
          { clearable: true, title: '时间', key: 'time', typeC: 'time' },
          {
            title: '名称',
            key: '12',
            typeC: 'slot',
            placeholder: '请输入内容',
            render: (h: any, parms: any) => {
              const elInput = resolveComponent('el-input')
              return h(elInput, {
                type: 'text',
                placeholder: parms.item.placeholder,
                modelValue: state.formData.name,
                onInput: (value: string) => {
                  state.formData.name = value
                }
              })
            }
          },
          {
            limit: 2,
            clearable: true,
            title: '图片',
            key: 'uploadImg',
            typeC: 'uploadImg',
            change: (file: File, files: File[]) => {
              console.log(file, files)
            }
          }
        ],
        submit() {
          alert('提交表单' + JSON.stringify(state.formData))
        },
        CANCEL() {
          state.visible = false
        },
        editSome() {
          state.visible = true
        }
      })
      return {
        ...toRefs(state),
        ...toRefs(parameterData)
      }
    }
  })
</script>

<style scoped></style>
