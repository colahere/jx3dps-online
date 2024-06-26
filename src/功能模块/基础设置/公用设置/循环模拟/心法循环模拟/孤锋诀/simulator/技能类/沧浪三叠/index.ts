import 循环模拟技能基础数据 from '../../../constant/skill'
import 技能统一类 from '../../通用类/技能统一类'

class 沧浪三叠 extends 技能统一类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '沧')
  static 回复锐意 = 0

  constructor(模拟循环) {
    super(模拟循环)
  }

  检查GCD() {
    const 单刀GCD = this.模拟循环.GCD组?.单刀 || 0
    const 双刀GCD = this.模拟循环.GCD组?.双刀 || 0
    const 最大GCD = Math.max(单刀GCD, 双刀GCD)
    // if (最大GCD) {
    //   this.模拟循环.增加时间?.(最大GCD)
    // }
    return 最大GCD || 0
  }

  判断沧链触发伤害() {
    const 沧链层数 = this.模拟循环.当前自身buff列表?.['沧链']?.当前层数
    if (!沧链层数) {
      this.沧浪造成伤害?.('沧浪三叠·一')
      // 添加两层沧链buff
      this.模拟循环.添加buff?.({ 名称: '沧链', 对象: '自身', 新增层数: 2 })
    } else if (沧链层数 > 1) {
      this.沧浪造成伤害?.('沧浪三叠·二')
      // 消耗一层沧链buff
      this.模拟循环.卸除buff?.({ 名称: '沧链', 对象: '自身', 卸除层数: 1 })
    } else if (沧链层数 === 1) {
      this.沧浪造成伤害?.('沧浪三叠·三')
      this.模拟循环.卸除buff?.({ 名称: '沧链', 对象: '自身', 卸除层数: 2 })
    }
  }

  命中() {
    // 判断有潋风时，添加水墨圈buff
    if (this.模拟循环.校验奇穴是否存在?.('长溯')) {
      this.模拟循环.添加buff?.({ 名称: '长溯', 对象: '目标' })
    }
  }

  造成伤害() {
    this.模拟循环.触发避实击虚?.()

    this.破浪三式触发鸣锋()

    const 当前破绽层数 = this.模拟循环.当前目标buff列表?.['破绽']?.当前层数 || 0

    if (this.模拟循环.校验奇穴是否存在?.('滔天') && 当前破绽层数 > 0) {
      this.触发伤害行为?.('沧浪三叠·一')
      this.触发伤害行为?.('沧浪三叠·二')
      this.触发伤害行为?.('沧浪三叠·三')
      this.保存释放记录('沧浪三叠·滔天')

      if (当前破绽层数 > 1) {
        this.模拟循环.添加战斗日志?.({
          日志: `触发滔天消耗一层破绽`,
          日志类型: '目标buff变动',
          日志时间: this.模拟循环.当前时间,
        })
        const 新破绽对象 = { ...this.模拟循环.当前目标buff列表?.['破绽'], 当前层数: 0 }
        新破绽对象.当前层数 = 当前破绽层数 - 1
        this.模拟循环.当前目标buff列表 = {
          ...(this.模拟循环.当前目标buff列表 || {}),
          破绽: { ...新破绽对象 } as any,
        }
        this.模拟循环.添加战斗日志?.({
          日志: `破绽层数变为【${新破绽对象.当前层数}】`,
          日志类型: '目标buff变动',
          日志时间: this.模拟循环.当前时间,
        })
      } else {
        this.模拟循环.卸除buff?.({ 名称: '破绽', 对象: '目标', 卸除层数: 1 })
      }
      this.模拟循环.卸除buff?.({ 名称: '沧链', 对象: '自身', 卸除层数: 2 })
    } else {
      this.判断沧链触发伤害()
    }
  }

  沧浪造成伤害(名称) {
    this.触发伤害行为(名称)

    this.保存释放记录(名称)
  }

  保存释放记录(名称) {
    this.本次释放记录 = {
      实际伤害技能: 名称,
      重要buff列表: this.获取当前重要buff列表(['戗风', '灭影追风', '流岚']),
    }
  }
}

export default 沧浪三叠

export const 沧浪三叠类型 = typeof 沧浪三叠
