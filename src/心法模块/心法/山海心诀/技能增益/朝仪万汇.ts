import { 技能增益列表类型 } from '@/@types/技能'
import { 属性类型 } from '@/@types/属性'
import 通用增益 from './通用'

const 朝仪万汇增益: 技能增益列表类型[] = [
  ...通用增益,
  // 朝仪吃劲风簇伤害秘籍加成，会心不确定
  {
    增益名称: '3%伤害',
    增益所在位置: '秘籍',
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.通用增伤, 值: 31 / 1024 }],
  },
  {
    增益名称: '2%伤害',
    增益所在位置: '秘籍',
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.通用增伤, 值: 21 / 1024 }],
  },
  {
    增益名称: '4%会心',
    增益所在位置: '秘籍',
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.外功会心百分比, 值: 0.04 }],
  },
  {
    增益名称: '3%会心',
    增益所在位置: '秘籍',
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.外功会心百分比, 值: 0.03 }],
  },
]

export default 朝仪万汇增益
