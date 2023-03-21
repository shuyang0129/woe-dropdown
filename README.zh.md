# 實作下拉式選單元件

不同的專案中，時常會有重複且具有挑戰性的功能需要實作。因此想透過在工作上或是網路上尋找值得挑戰的功能來進行練習/臨摹/研究，將範圍限縮在一個功能而不是一整個專案，希望藉由更多的小練習，來提升前端的能力。這個專案希望可以練習實作一個下拉式選單的共用元件，參考的原型是 [React MUI](https://mui.com/) 的 [Popover](https://mui.com/material-ui/api/popover/) 元件，下面是這項挑戰會完成的幾項重點：

- ✅ 使用 React Spring，完成下拉式選單動畫
- ✅ 使用 React Portal，動態產生 DOM 節點，並將下拉式選單元件渲染至該節點內
- ✅ 實作當下拉式選單開啟時，點擊按鈕或選單外側，關閉下拉式選單功能
- ✅ 提供 AnchorOrigin 變數，指定下拉式選單要對齊按鈕中的哪個位置
- ✅ 提供 TransformOrigin 變數，指定要使用下拉式選單的哪個位置作為原點，作為動畫特效的起始點以及用來對齊按鈕原點
- ✅ 根據按鈕位置、AnchorOrigin、TransformOrigin，將下拉式選單顯示在正確的位置上
- ✅ 實作當下拉式選單開啟時，鎖定 Body 捲動行為

<div align="center">
  <image src="src/assets/images/demo.png" alt="demo" width="70%" />
</div>

## 📔 Categories

- [Playground](#-playground)
- [使用技術](#-technologies)
- [專案設定](#%EF%B8%8F-jump-start)
- [DropdownMenu 元件 Props 與使用說明](#-dropdownmenu-元件-props-與使用說明)

## 👾 Playground

[Open in CodeSandbox](https://codesandbox.io/s/github/shuyang0129/woe-dropdown)

## 🔨 Technologies

專案主要使用的技術：

- React version: 18.2.0
- Typescript version: 4.9.5
- React Spring version: 9.1.7

## ⚡️ Jump Start

要使用此專案至本地開發，可以照下方步驟：

```bash
$ git clone git@github.com:shuyang0129/woe-dropdown.git
$ cd woe-dropdown
$ npm install
$ npm start
```

## 📖 DropdownMenu 元件 Props 與使用說明

```tsx
function App() {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)
  const isOpen = Boolean(anchorElement)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorElement(isOpen ? null : event.currentTarget)
  }

  const handleClose = () => setAnchorElement(null)

  return (
    <Fragment>
      <ButtonToToggleDropdownMenu onClick={handleClick} />
      <DropdownMenu
        isOpen={isOpen}
        anchorElement={anchorElement}
        handleClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* DropdownMenuItems */}
      </DropdownMenu>
    </Fragment>
  )
}
```

針對下拉式選單元件 `<DropdownMenu />` 的 `Props` 說明：

<table>
    <thead>
        <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>children</td>
            <td><code>ReactNode</code></td>
            <td><code>undefined</code></td>
            <td>
                傳入下拉式選單的內容
            </td>
        </tr>
        <tr>
            <td>anchorElement*</td>
            <td><code>HTMLElement | null</code></td>
            <td></td>
            <td>
                觸發開啟下拉式選單的按鈕
            </td>
        </tr>
        <tr>
            <td>isOpen*</td>
            <td><code>boolean</code></td>
            <td></td>
            <td>
                下拉式選單開啟狀態
            </td>
        </tr>
        <tr>
            <td>handleClose*</td>
            <td><code>() => void</code></td>
            <td></td>
            <td>
                關閉下拉式選單的函式
            </td>
        </tr>
        <tr>
            <td>anchorOrigin</td>
            <td>
                <code>{ horizontal: 'center' | 'left' | 'right' | number, vertical: 'bottom' | 'center' | 'top' | number }</code>
            </td>
            <td>
                <code>{ horizontal: 'left', vertical: 'bottom' }</code>
            </td>
            <td>指定觸發按鈕的原點</td>
        </tr>
        <tr>
            <td>transformOrigin</td>
            <td>
                <code>{ horizontal: 'center' | 'left' | 'right' | number, vertical: 'bottom' | 'center' | 'top' | number }</code>
            </td>
            <td>
                <code>{ horizontal: 'left', vertical: 'top' }</code>
            </td>
            <td>指定下拉式選單的原點</td>
        </tr>
        <tr>
            <td>sx</td>
            <td><code>CSSProperties</code></td>
            <td><code>{}</code></td>
            <td>客製化元件樣式</td>
        </tr>
        <tr>
            <td>disableScrollLock</td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>
                在下拉式選單開啟時針對<code>Body</code>去做捲動行為的鎖定，假設希望忽略或是客製化更為複雜的鎖定行為時，可以透過此<code>Prop</code>將其功能關閉
            </td>
        </tr>
    </tbody>
</table>
