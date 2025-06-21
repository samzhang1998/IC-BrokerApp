/* eslint-disable @typescript-eslint/no-unused-vars */
import { wrapperEnv } from '@/utils/env'

export function useDownLoad() {
  const { VITE_APP_BASE_URL } = wrapperEnv

  function downloadFile(params: string) {
    //获取params传入的文件类型
    //http://ic-crm.oss-ap-southeast-1.aliyuncs.com/product/product_8_logo?Expires=1750472721&OSSAccessKeyId=LTAI5tL37zeyMfudVzPL9vyZ&Signature=L2NrFzdA%2BiEvwxD9LE%2FcNb5JLyw%3D
    //获取上面这个链接的文件类型
    const fileType = params.split('?')[0].split('.').pop()
    console.log('fileType', fileType)
    console.log('params', params)
    uni.showLoading({
      title: 'Loading...',
      mask: true
    })
    const headers = {
      Authorization: uni.getStorageSync('userInfo')?.token || ''
    }
    uni.downloadFile({
      url: `${VITE_APP_BASE_URL}${params}`,
      responseType: 'blob',
      header: headers,
      success: (res) => {
        if (res.statusCode === 200) {
          console.log('下载成功')
          const filePaths = plus.io.convertLocalFileSystemURL(res.tempFilePath)
          plus.io.resolveLocalFileSystemURL(filePaths, function (entry) {
            //文件名称
            let tempFileName = entry.name || ''
            tempFileName = tempFileName.replace('_', '')
            // console.log(tempFileName)
            entry.getParent(function (parentDicEntry) {
              //文件路径
              // console.log('parentDicEntry', parentDicEntry)
              entry.moveTo(
                {
                  fullPath: parentDicEntry.fullPath + '/',
                  getMetadata: function (
                    succesCB: (result: PlusIoMetadata) => void,
                    errorCB: (result: any) => void,
                    recursive?: boolean | undefined
                  ): void {
                    throw new Error('Function not implemented.')
                  },
                  moveTo: function (
                    parent: PlusIoDirectoryEntry,
                    newName?: string | undefined,
                    succesCB?: ((result: PlusIoDirectoryEntry) => void) | undefined,
                    errorCB?: ((result: any) => void) | undefined
                  ): void {
                    throw new Error('Function not implemented.')
                  },
                  copyTo: function (
                    parent: PlusIoDirectoryEntry,
                    newName?: string | undefined,
                    succesCB?: ((result: PlusIoDirectoryEntry) => void) | undefined,
                    errorCB?: ((result: any) => void) | undefined
                  ): void {
                    throw new Error('Function not implemented.')
                  },
                  toURL: function (): string {
                    throw new Error('Function not implemented.')
                  },
                  toLocalURL: function (): string {
                    throw new Error('Function not implemented.')
                  },
                  toRemoteURL: function (): string {
                    throw new Error('Function not implemented.')
                  },
                  remove: function (
                    succesCB?: ((result: PlusIoDirectoryEntry) => void) | undefined,
                    errorCB?: ((result: any) => void) | undefined
                  ): void {
                    throw new Error('Function not implemented.')
                  },
                  getParent: function (
                    succesCB?: ((result: PlusIoDirectoryEntry) => void) | undefined,
                    errorCB?: ((result: any) => void) | undefined
                  ): void {
                    throw new Error('Function not implemented.')
                  },
                  createReader: function (): PlusIoDirectoryReader {
                    throw new Error('Function not implemented.')
                  },
                  getDirectory: function (
                    path: string,
                    flag?: PlusIoFlags | undefined,
                    succesCB?: ((result: PlusIoDirectoryEntry) => void) | undefined,
                    errorCB?: ((result: any) => void) | undefined
                  ): void {
                    throw new Error('Function not implemented.')
                  },
                  getFile: function (
                    path: string,
                    flag?: PlusIoFlags | undefined,
                    succesCB?: ((result: PlusIoFileEntry) => void) | undefined,
                    errorCB?: ((result: any) => void) | undefined
                  ): void {
                    throw new Error('Function not implemented.')
                  },
                  removeRecursively: function (
                    succesCB?: ((result: PlusIoDirectoryEntry) => void) | undefined,
                    errorCB?: ((result: any) => void) | undefined
                  ): void {
                    throw new Error('Function not implemented.')
                  }
                },
                `${tempFileName}`,
                function (newFile: any) {
                  console.log(newFile.fullPath, tempFileName)
                  uni.hideLoading()
                  uni.openDocument({
                    // fileType: 'xlsx',
                    filePath: newFile.fullPath,
                    success: function (res2) {
                      console.log('打开文档成功', res2)
                    },
                    fail: function (err) {
                      uni.showToast({
                        title: `打开失败`,
                        icon: 'none'
                      })
                      console.log(err)
                    }
                  })
                },
                function (moveError) {
                  uni.hideLoading()
                  uni.showToast({
                    title: `打开文件失败`,
                    icon: 'none'
                  })
                  console.log(moveError)
                }
              )
            })
          })
        }
      },
      fail: (err) => {
        uni.hideLoading()
        console.log(err)
      }
    })
  }

  function openFileUrl(url: string) {
    uni.openDocument({
      // fileType: 'xlsx',
      filePath: url,
      success: function (res) {
        console.log('打开文档成功', res)
      },
      fail: function (err) {
        uni.showToast({
          title: `打开失败`,
          icon: 'none'
        })
        console.log(err)
      }
    })
  }

  function downloadFileUrl(url: string) {
    uni.showLoading({
      title: 'Loading...',
      mask: true
    })
    uni.downloadFile({
      url: url,
      success: function (res) {
        uni.openDocument({
          // fileType: 'xlsx',
          filePath: res.tempFilePath,
          success: function (res) {
            uni.hideLoading()
            console.log('打开文档成功', res)
          },
          fail: function (err) {
            uni.hideLoading()
            uni.showToast({
              title: `打开失败`,
              icon: 'none'
            })
            console.log(err)
          }
        })
      },
      fail: function (err) {
        uni.hideLoading()
        console.log(err)
      }
    })
  }
  return { downloadFile, downloadFileUrl, openFileUrl }
}
