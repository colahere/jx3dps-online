// import 循环主类 from '../main'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 横云断浪 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '横')

  constructor(模拟循环) {
    super(模拟循环)

    // 因为横断技能充能信息受奇穴影响，这里做覆盖
    横云断浪.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '横')

    this.初始化技能运行数据(横云断浪.技能数据)
  }

  命中() {
    this.横云断浪上流血()
  }

  横云断浪上流血() {
    this.模拟循环.技能类实例集合?.流血?.获得和刷新流血?.()
  }

  造成伤害() {
    this.模拟循环.触发避实击虚?.()

    this.破浪三式触发鸣锋()

    this.触发伤害行为('横云断浪')

    this.保存释放记录()
  }

  保存释放记录() {
    this.本次释放记录 = {
      重要buff列表: this.获取当前重要buff列表(['戗风', '灭影追风', '流岚']),
    }
  }
}

export default 横云断浪

export const 横云断浪类型 = typeof 横云断浪
