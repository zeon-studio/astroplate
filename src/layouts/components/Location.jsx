'use client'

import React, { useState, useEffect } from 'react'

// -------------------------------------------------------------------------
// 1. 核心工具函数和组件
// -------------------------------------------------------------------------

/**
 * 从地址字符串中提取门店/地点名称。
 * 逻辑: 提取 '•' 符号之前的内容，并限制长度，确保在简约标签中不溢出。
 * @param {string} addr - 完整的地址字符串。
 * @returns {string} 提取后的地点名称。
 */
const getStoreName = (addr) => {
  if (!addr || typeof addr !== 'string') {
    return '未知地点 (Unknown Location)'
  }
  // 提取 '•' 之前的内容并精简
  const cleanName = addr.split('•')[0].trim()
  // 限制名称长度在简约模式下不超过 15 个字符
  return cleanName.length > 15 ? cleanName.substring(0, 12) + '...' : cleanName
}

/**
 * 地图定位图标 (填充式 SVG - 保持简约高级感)
 * 尺寸被固定为 w-4 h-4 (16px)
 */
const MapPinFilledIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16" // 缩小尺寸
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    className={className}
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
)

// -------------------------------------------------------------------------
// 2. 多重地图跳转逻辑 (保持不变，确保功能性)
// -------------------------------------------------------------------------

/**
 * 尝试打开中国常用地图的 URI Scheme，实现 deep link 跳转。
 * @param {string} address - 要搜索的地址。
 */
const openBestMapApp = (address) => {
  const encodedAddress = encodeURIComponent(address)
  const mapUrls = [
    `amapuri://route/plan/?dname=${encodedAddress}`,
    `baidumap://map/geocoder?address=${encodedAddress}`,
    `qqmap://map/routeplan?type=drive&to=${encodedAddress}`,
    `https://map.baidu.com/mobile/webapp/search/search/qt=s&wd=${encodedAddress}`,
  ]

  for (let i = 0; i < mapUrls.length - 1; i++) {
    const openedWindow = window.open(mapUrls[i], '_blank')
    if (openedWindow && !openedWindow.closed) return
  }
  window.open(mapUrls[mapUrls.length - 1], '_blank')
}

// -------------------------------------------------------------------------
// 3. Location 主组件 (简约胶囊标签样式)
// -------------------------------------------------------------------------

const Location = ({ address }) => {
  const [deviceType, setDeviceType] = useState('other')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const detectDevice = () => {
      if (typeof window === 'undefined') return 'other'
      const userAgent = navigator.userAgent
      if (/iPad|iPhone|iPod/.test(userAgent)) return 'ios'
      if (navigator.platform.includes('Mac')) return 'mac'
      if (/Android/.test(userAgent)) return 'android'
      return 'other'
    }
    setDeviceType(detectDevice())
  }, [])

  const handleLocationClick = () => {
    if (!address) {
      console.error('Location address is missing.')
      return
    }

    // Apple 设备优先 Apple Maps
    if (deviceType === 'ios' || deviceType === 'mac') {
      const targetUrl = `https://maps.apple.com/?q=${encodeURIComponent(address)}`
      window.open(targetUrl, '_blank')
    } else {
      // 其他设备尝试中国地图 Schemes
      openBestMapApp(address)
    }
  }

  const storeName = getStoreName(address)
  // 简短地址逻辑被移除，以实现简约的单行标签

  return (
    // 【关键修复】将 <div> 替换为 <button type="button">，解决 ESLint a11y 错误
    <button
      type="button" // 避免被误认为是提交按钮
      onClick={handleLocationClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // 整体容器：关键样式 'inline-flex' (可融入文本流), 'rounded-full' (胶囊), 'p-2' (紧凑)
      // 注意：由于替换成 <button>，需要添加 appearance-none 和 border-none 来重置浏览器默认按钮样式
      className={`// 重置浏览器默认样式 // 核心简约风格：浅蓝背景，细边框，无阴影 // 悬停效果：背景和边框颜色加深，提供优雅的反馈 mr-2 inline-flex max-w-full cursor-pointer appearance-none items-center gap-1.5 rounded-full border border-none border-blue-100 bg-blue-50 p-2 transition-all duration-200 ease-in-out select-none sm:max-w-xs dark:border-gray-700 dark:bg-gray-800 ${
        isHovered ? 'border-blue-300 bg-blue-100 dark:bg-gray-700' : ''
      } `}
    >
      {/* 图标区域：没有独立背景色，与文字直接并排 */}
      <MapPinFilledIcon
        className={`h-4 w-4 flex-shrink-0 transition-colors duration-200 ${isHovered ? 'text-blue-600 dark:text-blue-300' : 'text-blue-500 dark:text-blue-400'} `}
      />

      {/* 文字内容区域：单行显示门店名，字体更小，更像标签 */}
      <span
        className={`truncate text-sm font-medium whitespace-nowrap text-blue-600 transition-colors duration-200 dark:text-blue-300 ${isHovered ? 'text-blue-700 dark:text-blue-200' : ''} `}
      >
        {storeName}
      </span>
    </button>
  )
}

export default Location
