// 一键设置最佳附魔
import { Button, Modal, message } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch } from '@/hooks'
import { RiseOutlined } from '@ant-design/icons'
// import { 装备部位枚举 } from '@/@types/枚举'
import { 角色基础属性类型 } from '@/@types/角色'
import { 秒伤计算 } from '@/计算模块/计算函数'
import { 装备位置部位枚举 } from '@/@types/装备'

import 根据装备信息获取基础属性 from '../../工具函数/根据装备信息获取基础属性'
import { 修改装备属性, 初始化所有组合 } from './util'
import './index.css'

function 最佳附魔设置({ 一键替换附魔, 对比秒伤, 对比装备信息 }) {
  const [open, setOpen] = useState<boolean>(false)
  const [最大组合, 更新最大组合] = useState<any>({})
  const [最大Dps, 更新最大秒伤] = useState<number>(0)
  const [计算用时, 更新计算用时] = useState<number>(0)
  const [无附魔装备属性, 设置无附魔装备属性] = useState<角色基础属性类型>()
  // 所有组合的缓存数据
  const dispatch = useAppDispatch()
  const dataRef = useRef<any>()

  useEffect(() => {
    初始化()
  }, [对比装备信息])

  const 当前附魔信息 = useMemo(() => {
    const res: any[] = []
    const 不同部位: string[] = []
    if (Object.keys(最大组合)?.length !== 0) {
      const 列表 = 对比装备信息?.装备列表
      Object.keys(最大组合).forEach((key) => {
        const 装备位置 = 装备位置部位枚举[key]
        const 当前附魔 = 列表?.find((item) => item?.装备部位 === 装备位置)?.附魔 || ''
        res.push({
          部位: 装备位置,
          附魔: 当前附魔,
        })

        const 附魔属性 = Object.keys(最大组合[key])?.[0]
        const 附魔值 = Object.values(最大组合[key])?.[0]
        if (当前附魔 !== `${附魔属性}+${附魔值}`) {
          不同部位.push(key)
        }
      })
    }
    return {
      当前附魔: res,
      不同部位,
    }
  }, [对比装备信息, 最大组合])

  // 先根据当前的附魔列表，计算出最后计算dps时所需要的排列组合
  const 初始化 = () => {
    const res = 初始化所有组合()
    获取当前装备信息去除附魔加成的面板()
    dataRef.current = res
  }

  const 获取当前装备信息去除附魔加成的面板 = () => {
    const { 装备基础属性 } = 根据装备信息获取基础属性(对比装备信息, { 计算附魔: false })
    设置无附魔装备属性(装备基础属性)
  }

  const 计算前提示 = () => {
    if (无附魔装备属性) {
      Modal.confirm({
        title: `确定开始计算吗`,
        content: `共 ${dataRef?.current?.length} 种组合，计算将造成一定卡顿`,
        okText: '我要计算',
        onOk: async () => {
          开始计算()
        },
      })
    }
  }

  const 开始计算 = () => {
    const 开始计算时间 = new Date().valueOf()
    let 最大秒伤 = 0
    let 最大组合: any = {}
    if (dataRef?.current?.length) {
      for (let i = 0; i < dataRef?.current?.length; i++) {
        const 当前附魔数据 = dataRef?.current[i]
        const 修改后装备属性 = 修改装备属性(无附魔装备属性 as 角色基础属性类型, 当前附魔数据)
        const { 秒伤 } = dispatch(
          秒伤计算({
            更新装备信息: {
              ...对比装备信息,
              装备基础属性: 修改后装备属性,
            } as any,
          })
        )
        if (秒伤 > 最大秒伤) {
          最大秒伤 = 秒伤
          最大组合 = 当前附魔数据
        }
      }
    }
    更新最大组合(最大组合)
    更新最大秒伤(最大秒伤)
    const 结束计算时间 = new Date().valueOf()
    const 计算用时 = 结束计算时间 - 开始计算时间
    if (最大秒伤 > 对比秒伤) {
      setOpen(true)
      更新计算用时(计算用时)
    } else {
      message.success(`当前附魔已为最佳方案，无需替换。计算用时${计算用时}ms`)
    }
  }

  const closeModal = () => {
    setOpen(false)
    更新最大组合({})
    更新最大秒伤(0)
  }

  return (
    <>
      <Button type='primary' size='small' onClick={() => 计算前提示()}>
        一键设置附魔
      </Button>
      {/* 设置提醒和结果弹窗 */}
      <Modal
        title={
          <div className={'max-fumo-modal-title'}>
            <span>最佳附魔结果对比</span>
            <span>计算用时：{计算用时}ms</span>
          </div>
        }
        centered
        open={open}
        width={500}
        onCancel={() => setOpen(false)}
        footer={
          <Button
            type='primary'
            onClick={async () => {
              await 一键替换附魔(最大组合)
              closeModal()
            }}
          >
            一键替换
          </Button>
        }
      >
        <div className={'max-fumo-wrap'}>
          <div className='max-fumo-content'>
            <h1 className={'max-fumo-title'}>替换前</h1>
            <h1 className='max-fumo-dps'>{对比秒伤}</h1>
            <div>
              {(当前附魔信息?.当前附魔 || []).map((item, index) => {
                return (
                  <div className={`max-fumo-item`} key={`${item?.部位}_${index}`}>
                    <span className='max-fumo-label'>{item?.部位}</span>
                    <span className='max-fumo-value'>{item?.附魔}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='max-fumo-content'>
            <h1 className={'max-fumo-title'}>替换后</h1>
            <h1 className='max-fumo-dps max-fumo-dps-up'>
              {最大Dps}
              <RiseOutlined className='max-fumo-dps-icon' />
            </h1>
            <div>
              {Object.keys(最大组合).map((key) => {
                const 附魔属性 = Object.keys(最大组合[key])?.[0]
                const 附魔值 = Object.values(最大组合[key])?.[0]
                return (
                  <div
                    className={`max-fumo-item ${
                      当前附魔信息?.不同部位?.includes(key) ? 'max-fumo-diff' : ''
                    }`}
                    key={key}
                  >
                    <span className='max-fumo-label'>{装备位置部位枚举[key]}</span>
                    <span className='max-fumo-value'>{`${附魔属性}+${附魔值}`}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default 最佳附魔设置
