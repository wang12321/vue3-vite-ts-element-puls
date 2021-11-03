<template>
  <div>
    <el-form v-bind="$attrs" ref="ruleForm" :model="formData" :rules="rules" @submit.enter.prevent>
      <el-row>
        <el-col v-for="item in formList" :key="item.key" :span="item.span ? item.span : span">
          <el-form-item
            :label="item.title + ':'"
            :label-width="LabelWidth"
            :prop="rules && rules[item.key] !== undefined ? item.key : ''"
            :class="item.class ? item.class : ''"
          >
            <el-input
              v-if="item.typeC === 'input'"
              v-model="formDataObj[item.key]"
              :clearable="item.clearable"
              :disabled="item.disabled"
              :readonly="item.readonly"
              :maxlength="item.maxlength"
              :minlength="item.minlength"
              :size="item.size"
              :prefix-icon="item.prefixIcon"
              :suffix-icon="item.suffixIcon"
              :placeholder="item.placeholder ? item.placeholder : '请填写' + item.title"
              @change="item.change ? item.change() : null"
              @focus="item.focus ? item.focus() : null"
            />
            <el-input
              v-if="item.typeC === 'number'"
              type="number"
              v-model="formDataObj[item.key]"
              :clearable="item.clearable"
              :disabled="item.disabled"
              :readonly="item.readonly"
              :maxlength="item.maxlength"
              :minlength="item.minlength"
              :size="item.size"
              :prefix-icon="item.prefixIcon"
              :suffix-icon="item.suffixIcon"
              :placeholder="item.placeholder ? item.placeholder : '请填写' + item.title"
              @change="item.change ? item.change() : null"
              @focus="item.focus ? item.focus() : null"
            />
            <el-input
              v-else-if="item.typeC === 'password'"
              v-model="formDataObj[item.key]"
              type="password"
              :placeholder="item.placeholder ? item.placeholder : '请填写' + item.title"
              :clearable="item.clearable"
              :disabled="item.disabled"
              :readonly="item.readonly"
              :maxlength="item.maxlength"
              :minlength="item.minlength"
              :size="item.size"
              :prefix-icon="item.prefixIcon"
              :suffix-icon="item.suffixIcon"
              @change="item.change ? item.change() : null"
              @focus="item.focus ? item.focus() : null"
            />
            <el-input
              v-else-if="item.typeC === 'textarea'"
              v-model="formDataObj[item.key]"
              type="textarea"
              :rows="item.rows"
              autocomplete="off"
              :placeholder="item.placeholder ? item.placeholder : '请填写' + item.title"
              :clearable="item.clearable"
              :disabled="item.disabled"
              :readonly="item.readonly"
              :minlength="item.minlength"
              :size="item.size"
              @change="item.change ? item.change() : null"
              @focus="item.focus ? item.focus() : null"
            />
            <el-select
              v-else-if="item.typeC === 'select'"
              v-model="formDataObj[item.key]"
              :multiple="item.multiple"
              :multiple-limit="item.multipleLimit"
              :placeholder="item.placeholder ? item.placeholder : '请选择' + item.title"
              :filterable="item.filterable"
              :clearable="item.clearable"
              :disabled="item.disabled"
              :style="item.width ? `width:${item.width}` : ''"
              @change="item.change ? item.change() : null"
            >
              <el-option
                v-for="option in item.options"
                :key="option[item.label] + option[item.value]"
                :label="option[item.label]"
                :value="
                  item.merge ? `${option[item.value]}@${option[item.label]}` : option[item.value]
                "
                :disabled="option.disabled"
              />
            </el-select>
            <el-select
              v-else-if="item.typeC === 'selectID'"
              ref="Select"
              v-model="formDataObj[item.key]"
              :multiple="item.multiple"
              :multiple-limit="item.multipleLimit"
              :clearable="item.clearable"
              :filterable="item.filterable"
              :disabled="item.disabled"
              :remote="item.remote"
              :size="item.size"
              :placeholder="item.placeholder ? item.placeholder : '请选择' + item.title"
              :style="item.width ? `width:${item.width}` : ''"
              :filter-method="item.filterMethod"
              :remote-method="item.remoteMethod"
              @change="item.change ? item.change() : null"
            >
              <el-option
                v-for="option in item.options"
                :key="option[item.label] + option[item.value]"
                :label="option[item.label] + '(' + option[item.value] + ')'"
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
              :disabled="item.disabled"
              :placeholder="item.placeholder ? item.placeholder : '请选择' + item.title"
              value-format="yyyy-MM-dd HH:mm:ss"
              :style="item.width ? `width:${item.width}` : ''"
            />
            <el-date-picker
              v-else-if="item.typeC === 'datetimeNO'"
              v-model="formDataObj[item.key]"
              type="datetime"
              :clearable="item.clearable"
              :disabled="item.disabled"
              :placeholder="item.placeholder ? item.placeholder : '请选择' + item.title"
              value-format="yyyyMMddHHmmss"
              :style="item.width ? `width:${item.width}` : ''"
            />
            <el-date-picker
              v-else-if="item.typeC === 'date'"
              v-model="formDataObj[item.key]"
              type="date"
              :clearable="item.clearable"
              :disabled="item.disabled"
              :placeholder="item.placeholder ? item.placeholder : '请选择' + item.title"
              value-format="yyyy-MM-dd"
              :style="item.width ? `width:${item.width}` : ''"
            />
            <el-date-picker
              v-else-if="item.typeC === 'year'"
              v-model="formDataObj[item.key]"
              type="year"
              :clearable="item.clearable"
              :disabled="item.disabled"
              value-format="yyyy"
              :placeholder="item.placeholder ? item.placeholder : '请选择' + item.title"
              :style="item.width ? `width:${item.width}` : ''"
            />
            <el-date-picker
              v-else-if="item.typeC === 'month'"
              v-model="formDataObj[item.key]"
              type="month"
              value-format="yyyy-MM"
              placeholder="请选择月份"
              :style="item.width ? `width:${item.width}` : ''"
            />
            <el-date-picker
              v-else-if="item.typeC === 'dateH'"
              v-model="formDataObj[item.key]"
              type="date"
              :clearable="item.clearable"
              :disabled="item.disabled"
              :placeholder="item.placeholder ? item.placeholder : '请选择' + item.title"
              value-format="yyyy-MM-dd HH:mm:ss"
              :style="item.width ? `width:${item.width}` : ''"
            />
            <el-date-picker
              v-else-if="item.typeC === 'datetimerange'"
              v-model="formDataObj[item.key]"
              type="datetimerange"
              :clearable="item.clearable"
              :disabled="item.disabled"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              :style="item.width ? `width:${item.width}` : ''"
            />
            <el-date-picker
              v-else-if="item.typeC === 'daterange'"
              v-model="formDataObj[item.key]"
              type="daterange"
              :clearable="item.clearable"
              :disabled="item.disabled"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :style="item.width ? `width:${item.width}` : ''"
            />
            <el-cascader
              v-else-if="item.typeC === 'cascader'"
              v-model="formDataObj[item.key]"
              :options="item.options"
              :clearable="item.clearable"
              :props="item.props"
              :placeholder="item.placeholder ? item.placeholder : '请选择' + item.title"
              :collapse-tags="item.collapseTags"
              :show-all-levels="item.showAllLevels"
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
            <div v-else-if="item.typeC === 'uploadImg'" style="text-align: left">
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :file-list="formDataObj[item.key]"
                :on-change="item.change ? item.change : null"
                :on-remove="item.change ? item.change : null"
                :limit="item.limit"
                accept="image/*"
              >
                <el-icon><plus /></el-icon>
              </el-upload>
            </div>
            <div v-else-if="item.typeC === 'slot'" style="text-align: left">
              <expand-dom :item="item" :render="item.render" />
            </div>
          </el-form-item>
          <el-form-item>
            <slot name="formItem" />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="dialog-footer">
        <el-button @click="close" v-if="$attrs['onCANCEL']">{{ closeText }}</el-button>
        <el-button type="primary" v-if="$attrs['onSubmit']" @click="save('ruleForm')">{{
          submitText
        }}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, getCurrentInstance, h, ref } from 'vue'
  import { Plus } from '@element-plus/icons'

  export default defineComponent({
    name: 'DialogForm',
    components: {
      Plus,
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
      // 表单校验规则，详见 element ui rules 规则
      rules: {
        type: Object
      },
      // 必传，表单项
      formList: {
        type: Array,
        required: true
      },
      //必传，表单数据存储对象
      formData: {
        type: Object,
        required: true
      },
      //选传，表单label宽度
      LabelWidth: {
        type: String,
        default: '140px'
      },
      //  选传，一行放几个表单，
      span: {
        type: Number,
        default: 24
      },
      // 关闭按钮名称
      closeText: {
        type: String,
        default: '关 闭'
      },
      // 确定按钮名称
      submitText: {
        type: String,
        default: '确 定'
      }
    },
    // emits: ['CANCEL', 'submit'],
    // 如果要使用$attrs 那么就需要这样写不能用{emit}
    setup(props, context) {
      const { proxy } = getCurrentInstance() as any
      const dialogImageUrl = ref('')
      const dialogVisible = ref(false)
      const disabled = ref(false)
      const formDataObj = computed(() => props.formData)
      const close = () => {
        context.emit('CANCEL')
      }
      const handlePictureCardPreview = (file: any) => {
        dialogImageUrl.value = file.url
        dialogVisible.value = true
      }
      const save = (formName: string) => {
        proxy.$refs[formName].validate((valid: boolean) => {
          if (valid) {
            // 校验通过
            context.emit('submit')
          } else {
            return false
          }
        })
      }
      return {
        close,
        dialogImageUrl,
        dialogVisible,
        handlePictureCardPreview,
        disabled,
        save,
        formDataObj
      }
    }
  })
</script>

<style scoped>
  .dialog-footer {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
</style>
