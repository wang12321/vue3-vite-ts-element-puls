<template>
  <div>
    <el-form
      ref="searchForm"
      :inline="true"
      :model="formData"
      :rules="rules"
      class="demo-form-inline"
      :label-width="labelWidth"
      @submit.enter.prevent
    >
      <div v-for="item in formOptions" :key="item.key" style="display: inline-block">
        <el-form-item
          v-if="isAdvanced ? checkIsShow(item) : checkIsShowDefault(item)"
          :prop="item.key"
          :label="!item.titleShow ? item.title + '：' : ''"
          :label-width="item.labelWidth || labelWidth"
        >
          <el-input
            v-if="item.typeC === 'input'"
            v-model="formDataObj[item.key]"
            :clearable="item.clearable"
            :disabled="item.disabled"
            :placeholder="item.placeholder ? item.placeholder : '请填写' + item.title"
            :style="item.width ? `width:${item.width}` : ''"
            @focus="item.focus ? item.focus() : null"
          />
          <el-date-picker
            v-else-if="item.typeC === 'month'"
            v-model="formDataObj[item.key]"
            type="month"
            value-format="YYYY-MM"
            placeholder="请选择月份"
            :style="item.width ? `width:${item.width}` : ''"
          />
          <el-date-picker
            v-else-if="item.typeC === 'year'"
            v-model="formDataObj[item.key]"
            type="year"
            value-format="YYYY"
            placeholder="请选择年"
            :style="item.width ? `width:${item.width}` : ''"
          />
          <el-select
            v-else-if="item.typeC === 'select'"
            ref="Select"
            v-model="formDataObj[item.key]"
            :multiple="item.multiple"
            :clearable="item.clearable"
            :filterable="item.filterable"
            :remote="item.remote"
            :collapse-tags="item.collapsetags"
            :placeholder="item.placeholder ? item.placeholder : '请选择' + item.title"
            :style="item.width ? `width:${item.width}` : ''"
            :filter-method="item.filterMethod"
            :remote-method="item.remoteMethod"
            @change="item.change ? item.change() : null"
          >
            <el-option
              v-for="option in item.options"
              :key="option[item.label] + option[item.value]"
              :label="option[item.label]"
              :value="option[item.value]"
              :disabled="option.disabled"
            />
          </el-select>
          <el-select
            v-else-if="item.typeC === 'selectID'"
            ref="Select"
            v-model="formDataObj[item.key]"
            :multiple="item.multiple"
            :clearable="item.clearable"
            :filterable="item.filterable"
            :remote="item.remote"
            :collapse-tags="item.collapsetags"
            :placeholder="item.placeholder ? item.placeholder : '请选择' + item.title"
            :style="item.width ? `width:${item.width}` : ''"
            :filter-method="item.filterMethod"
            :remote-method="item.remoteMethod"
            @change="item.change ? item.change() : null"
          >
            <el-option
              v-for="option in item.options"
              :key="option[item.label] + option[item.value]"
              :label="option[item.label] + option[item.value]"
              :value="option[item.value]"
              :disabled="option.disabled"
            />
          </el-select>
          <el-time-picker
            v-else-if="item.typeC === 'time'"
            v-model="formDataObj[item.key]"
            :placeholder="item.placeholder ? item.placeholder : '请选择' + item.title"
            value-format="HH:mm:ss"
            :style="item.width ? `width:${item.width}` : ''"
          />
          <el-date-picker
            v-else-if="item.typeC === 'datetime'"
            v-model="formDataObj[item.key]"
            type="datetime"
            :clearable="item.clearable"
            :placeholder="item.placeholder ? item.placeholder : '请选择' + item.title"
            value-format="YYYY-MM-dd HH:mm:ss"
            :style="item.width ? `width:${item.width}` : ''"
          />
          <el-date-picker
            v-else-if="item.typeC === 'datetimeNO'"
            v-model="formDataObj[item.key]"
            type="datetime"
            :clearable="item.clearable"
            :placeholder="item.placeholder ? item.placeholder : '请选择' + item.title"
            value-format="YYYYMMddHHmmss"
            :style="item.width ? `width:${item.width}` : ''"
          />
          <el-date-picker
            v-else-if="item.typeC === 'date'"
            v-model="formDataObj[item.key]"
            type="date"
            :clearable="item.clearable"
            :placeholder="item.placeholder ? item.placeholder : '请选择' + item.title"
            value-format="YYYY-MM-dd"
            :style="item.width ? `width:${item.width}` : ''"
          />
          <el-date-picker
            v-else-if="item.typeC === 'dateH'"
            v-model="formDataObj[item.key]"
            type="date"
            :clearable="item.clearable"
            :placeholder="item.placeholder ? item.placeholder : '请选择' + item.title"
            value-format="YYYY-MM-dd HH:mm:ss"
            :style="item.width ? `width:${item.width}` : ''"
          />
          <el-date-picker
            v-else-if="item.typeC === 'datetimerange'"
            v-model="formDataObj[item.key]"
            type="datetimerange"
            :clearable="item.clearable"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-dd HH:mm:ss"
            :placeholder="item.placeholder ? item.placeholder : '请选择' + item.title"
            :style="item.width ? `width:${item.width}` : ''"
          />
          <el-date-picker
            v-else-if="item.typeC === 'daterange'"
            v-model="formDataObj[item.key]"
            type="daterange"
            :clearable="item.clearable"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-dd"
            :placeholder="item.placeholder ? item.placeholder : '请选择' + item.title"
            :style="item.width ? `width:${item.width}` : ''"
          />
          <el-cascader
            v-else-if="item.typeC === 'cascader'"
            v-model="formDataObj[item.key]"
            :options="item.options"
            :clearable="item.clearable"
            :props="item.props"
            :collapse-tags="item.collapseTags"
            :show-all-levels="item.showAllLevels"
            :placeholder="item.placeholder ? item.placeholder : '请选择' + item.title"
            :style="item.width ? `width:${item.width}` : ''"
          />
          <div v-else-if="item.typeC === 'radio'" style="text-align: left">
            <el-radio-group v-model="formDataObj[item.key]" size="small">
              <el-radio-button
                v-for="option in item.options"
                :key="option[item.label]"
                :label="option[item.label]"
              >
              </el-radio-button>
            </el-radio-group>
          </div>
          <div v-else-if="item.typeC === 'checkbox'" style="text-align: left">
            <el-checkbox-group v-model="formDataObj[item.key]" size="small">
              <el-checkbox
                v-for="option in item.options"
                :key="option[item.label]"
                :label="option[item.label]"
                :border="item.border"
                :disabled="item.disabled"
              >
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div v-else-if="item.typeC === 'inputNumber'" style="text-align: left">
            <el-input-number
              v-model="formDataObj[item.key]"
              controls-position="right"
              @change="item.change ? item.change() : null"
              :min="item.min"
              :max="item.max"
              :style="item.width ? `width:${item.width}` : ''"
            >
            </el-input-number>
          </div>
          <div v-else-if="item.typeC === 'switch'" style="text-align: left">
            <el-switch
              v-model="formDataObj[item.key]"
              :active-text="item.activeText"
              :inactive-text="item.inactiveText"
            >
            </el-switch>
          </div>

          <div v-else-if="item.typeC === 'slot'" style="text-align: left">
            <expand-dom :item="item" :render="item.render" />
          </div>
        </el-form-item>
      </div>
      <el-form-item>
        <slot name="formItem" />
      </el-form-item>
      <el-form-item v-if="isAdvanced ? open || mode === 'normal' : true">
        <el-button type="primary" :icon="submitBtn.icon" @click="save('searchForm')">{{
          submitBtn.name
        }}</el-button>
      </el-form-item>
      <el-form-item v-if="(isAdvanced ? open || mode === 'normal' : true) && $attrs['onReset']">
        <el-button icon="el-icon-refresh" @click="reset('searchForm')">重置</el-button>
      </el-form-item>
      <el-form-item>
        <slot name="button" />
      </el-form-item>
      <el-form-item v-if="isAdvanced && !isSearch">
        <div
          id="AdvancedSearch"
          type="primary"
          :icon="open ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
          @click="changeOpen"
          >高级搜索</div
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
  import { defineComponent, getCurrentInstance, h, computed, ref } from 'vue'
  import { itemType } from './searchForm'
  export default defineComponent({
    name: 'SearchForm',
    components: {
      expandDom: {
        props: {
          render: Function,
          item: {
            type: Object,
            default: {}
          }
        },
        render: (ctx: any) => {
          return ctx.render(h, ctx)
        }
      }
    },
    props: {
      // 必传，表单项
      formOptions: {
        type: Array,
        required: true
      },
      // 必传，表单数据存储对象
      formData: {
        type: Object,
        required: true
      },
      // 选传，是否开启高级搜索，默认关闭
      isAdvanced: {
        type: Boolean,
        default: false
      },
      //选传，高级搜索按钮控制
      isSearch: {
        type: Boolean,
        default: false
      },
      // 选传，开启高级组件时有效，
      mode: {
        type: String,
        default: 'normal'
      },
      // 选传，表单label宽度，默认'100px'
      labelWidth: {
        type: String,
        default: '100px'
      },
      // 选传，表单提交按钮
      submitBtn: {
        type: Object,
        default: () => ({
          icon: 'el-icon-search',
          name: '查询'
        })
      },
      // 选传，表单校验规则
      rules: {
        type: Object
      },
      // 选传，special模式下关键字搜索input提示
      placeholder: {
        type: String
      }
    },
    setup(props, context) {
      const { proxy } = getCurrentInstance() as any
      const formDataObj = computed(() => props.formData)
      const open = ref(false)
      const checkIsShow = (item: itemType) => {
        if (props.mode === 'normal') {
          // 当 hidden 为 true 时隐藏
          if (item.hidden) return false
          // 当isAdvanced为true时一直显示
          else if (item.isAdvanced) return true
          // 否则当open为true时显示，否则隐藏
          else if (open.value) return true
          return false
        } else if (props.mode === 'special') {
          // 当 hidden 为 true 时隐藏
          if (item.hidden) return false
          // 否则当open为true时显示，否则隐藏
          else if (open.value) return true
          return false
        }
      }
      const checkIsShowDefault = (item: itemType) => {
        return !item.hidden
      }
      const changeOpen = () => {
        open.value = !open.value
        context.emit('reset')
      }
      const save = (formName: string) => {
        // eslint-disable-next-line consistent-return
        proxy.$refs[formName].validate((valid: boolean) => {
          if (valid) {
            // 校验通过
            context.emit('submit')
          } else {
            return false
          }
        })
      }
      const reset = () => {
        context.emit('reset')
      }
      return {
        reset,
        save,
        changeOpen,
        checkIsShowDefault,
        checkIsShow,
        open,
        formDataObj
      }
    }
  })
</script>

<style scoped>
  .search-form-advanced .el-input-group__append {
    background: #1890ff;
    border: 1px solid #1890ff;
    color: #fff;
    font-size: 20px;
  }
</style>
