import { request } from './request.js'

export function getCategory() {
  return request({
    url: '/category'
  })
}

export function getSubCategory(maitkey) {
  return request({
    url: '/subcategory',
    params: {
      maitkey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}