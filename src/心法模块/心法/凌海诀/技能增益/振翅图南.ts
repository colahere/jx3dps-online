import { 技能增益列表类型 } from '@/@types/技能'
import { 属性类型 } from '@/@types/属性'
import 通用增益 from './通用增益/通用'
import 门派套装增益 from './通用增益/门派套装增益'

const 振翅图南增益: 技能增益列表类型[] = [
  ...通用增益,
  ...门派套装增益,
  {
    增益名称: '濯流',
    增益所在位置: '奇穴',
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.非侠增伤, 值: 1536 / 1024 }],
  },
  {
    增益名称: '3%伤害',
    增益所在位置: '秘籍',
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.通用增伤, 值: 31 / 1024 }],
  },
  {
    增益名称: '4%伤害',
    增益所在位置: '秘籍',
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.通用增伤, 值: 41 / 1024 }],
  },
  {
    增益名称: '5%伤害',
    增益所在位置: '秘籍',
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.通用增伤, 值: 51 / 1024 }],
  },
  {
    增益名称: '2%会心',
    增益所在位置: '秘籍',
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.外功会心百分比, 值: 0.02 }],
  },
  {
    增益名称: '3%会心',
    增益所在位置: '秘籍',
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.外功会心百分比, 值: 0.03 }],
  },
  {
    增益名称: '4%会心',
    增益所在位置: '秘籍',
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.外功会心百分比, 值: 0.04 }],
  },
  {
    增益名称: '跟踪',
    增益所在位置: '秘籍',
    增益类型: '全局启用',
    增益集合: [],
  },
]

export default 振翅图南增益
