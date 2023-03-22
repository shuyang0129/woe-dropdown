# Implementing a dropdown menu component

English | [繁體中文](./README.zh.md)

In different projects, there are often recurring and challenging functionalities that need to be implemented. Therefore, I want to practice/imitate/research by finding challenging functionalities at work or on the internet, and narrow the scope to a single function rather than an entire project, hoping to improve front-end capabilities through more small exercises. This project aims to practice implementing a shared component of a dropdown menu, with the reference prototype being the [Popover](https://mui.com/material-ui/api/popover/) component of [React MUI](https://mui.com/). Here are several key points that this challenge will complete:

- ✅ Use React Spring to complete the dropdown menu animation
- ✅ Use React Portal to dynamically generate DOM nodes and render the dropdown menu component to the node
- ✅ Implement the function of closing the dropdown menu when the button or outside of menu is clicked
- ✅ Provide the AnchorOrigin prop to specify which position of the button the dropdown menu should align with
- ✅ Provide the TransformOrigin prop to specify which position of the dropdown menu to use as the origin, as the starting point of the animation effect, and to align with the button origin
- ✅ According to the button position, AnchorOrigin, and TransformOrigin, display the dropdown menu in the correct position
- ✅ Implement locking body scroll behavior when the dropdown menu is open

<div align="center">
  <image src="src/assets/images/demo.png" alt="demo" width="70%" />
</div>

## 📔 Categories

- [Playground](#-playground)
- [Technologies](#-technologies)
- [Jump Start](#%EF%B8%8F-jump-start)
- [DropdownMenu Component Props and Usage Instructions](#-dropdownmenu-component-props-and-usage-instructions)

## 👾 Playground

[Open in CodeSandbox](https://codesandbox.io/s/github/shuyang0129/woe-dropdown)

## 🔨 Technologies

The main technologies used in the project:

- React version: 18.2.0
- Typescript version: 4.9.5
- React Spring version: 9.1.7

## ⚡️ Jump Start

To use this project for local development, follow the steps below:

```bash
$ git clone git@github.com:shuyang0129/woe-dropdown.git
$ cd woe-dropdown
$ npm install
$ npm start
```

## 📖 DropdownMenu Component Props and Usage Instructions

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

The following table describes the props for the <DropdownMenu> component:

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
                The content to be displayed in the dropdown menu.
            </td>
        </tr>
        <tr>
            <td>anchorElement*</td>
            <td><code>HTMLElement | null</code></td>
            <td></td>
            <td>
                The button that triggers the opening of the dropdown menu.
            </td>
        </tr>
        <tr>
            <td>isOpen*</td>
            <td><code>boolean</code></td>
            <td></td>
            <td>
                The open state of the dropdown menu.
            </td>
        </tr>
        <tr>
            <td>handleClose*</td>
            <td><code>() => void</code></td>
            <td></td>
            <td>
                The function to close the dropdown menu.
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
            <td>Specifies the anchor point of the trigger button.</td>
        </tr>
        <tr>
            <td>transformOrigin</td>
            <td>
                <code>{ horizontal: 'center' | 'left' | 'right' | number, vertical: 'bottom' | 'center' | 'top' | number }</code>
            </td>
            <td>
                <code>{ horizontal: 'left', vertical: 'top' }</code>
            </td>
            <td>Specifies the anchor point of the dropdown menu.</td>
        </tr>
        <tr>
            <td>sx</td>
            <td><code>CSSProperties</code></td>
            <td><code>{}</code></td>
            <td>Customize the style of the component.</td>
        </tr>
        <tr>
            <td>disableScrollLock</td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>
            Disables the scroll lock behavior on the <code>Body</code> when the dropdown menu is open. If you wish to ignore or customize more complex locking behavior, you can turn off this feature through this <code>Prop</code>.
            </td>
        </tr>
    </tbody>
</table>
