#### Remember to activate something like Chrome Device Mode before using the examples because the component needs touch emulation

#### Default:

```js
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import ListSelect from '../ListSelect/ListSelect'
const [isOpen, setIsOpen] = React.useState(false)
const valueListItems = [
  {
    label: "ICU 2nd Floor 2.4GHz",
    value: "icu 2nd floor 2.4ghz",
    suffix: <Icon name="IconWifi" style={{ color: "secondary" }} />,
  },
  {
    label: "ICU 1st Floor 2.4GHz",
    value: "icu 1st floor 2.4ghz",
    suffix: <Icon name="IconWifi2" style={{ color: "secondary" }} />,
  },
  {
    label: "ICU Front Desk 2.4GHz",
    value: "icu front desk 2.4ghz",
    suffix: <Icon name="IconWifi1" style={{ color: "secondary" }} />,
  },
]
;(
<div style={{ height: `100%`, width: 300 }}>
  <Button
    onClick={() => {
      setIsOpen(!isOpen)
    }}
  >
    Toggle Open
  </Button>
  <MobileModal open={isOpen}>
    <Button
      color="text"
      iconName="IconChevronLeft"
      onClick={() => {
        setIsOpen(!isOpen)
      }}
    >
      Back
    </Button>
    <h1 style={{ marginTop: 0, textAlign: `center`, variant: `text.heading1` }}>
      Enter Wi-Fi Password
    </h1>
    <ListSelect options={valueListItems} />
  </MobileModal>
</div>
)
```

#### Dismissible:

##### To turn a controlled modal into a dismissible one, you must inform the onDismiss property, the dismissible prop is not required in that case and will be ignored

```js
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import ListSelect from '../ListSelect/ListSelect'
const [isOpen, setIsOpen] = React.useState(false)
const valueListItems = [
  {
    label: "ICU 2nd Floor 2.4GHz",
    value: "icu 2nd floor 2.4ghz",
    suffix: <Icon name="IconWifi" style={{ color: "secondary" }} />,
  },
  {
    label: "ICU 1st Floor 2.4GHz",
    value: "icu 1st floor 2.4ghz",
    suffix: <Icon name="IconWifi2" style={{ color: "secondary" }} />,
  },
  {
    label: "ICU Front Desk 2.4GHz",
    value: "icu front desk 2.4ghz",
    suffix: <Icon name="IconWifi1" style={{ color: "secondary" }} />,
  },
]
;(
<div style={{ height: `100%`, width: 300 }}>
  <Button
    onClick={() => {
      setIsOpen(!isOpen)
    }}
  >
    Toggle Open
  </Button>
  <MobileModal
    onDismiss={() => {
      setIsOpen(false)
    }}
    open={isOpen}
  >
    <div
      style={{
        alignContent: `center`,
        alignItems: `center`,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `space-evenly`,
      }}
    >
      <Button
        color="text"
        iconName="IconChevronLeft"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        style={{
          alignSelf: `flex-start`,
          marginBottom: 64,
        }}
        variant="filled"
      >
        Back
      </Button>
      <h1 style={{ marginTop: 0, textAlign: `center`, variant: `text.heading1` }}>
        Enter Wi-Fi Password
      </h1>
      <ListSelect options={valueListItems} />
    </div>
  </MobileModal>
</div>
)
```
#### All next draggable example needs to hide the modal to avoid displaying through all this page, so toggle the display on to test the component

#### Draggable:

```js
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import ListSelect from '../ListSelect/ListSelect'
const [displayMobileModal, setDisplayMobileModal] = React.useState(false)
const valueListItems = [
  {
    label: "ICU 2nd Floor 2.4GHz",
    value: "icu 2nd floor 2.4ghz",
    suffix: <Icon name="IconWifi" style={{ color: "secondary" }} />,
  },
  {
    label: "ICU 1st Floor 2.4GHz",
    value: "icu 1st floor 2.4ghz",
    suffix: <Icon name="IconWifi2" style={{ color: "secondary" }} />,
  },
  {
    label: "ICU Front Desk 2.4GHz",
    value: "icu front desk 2.4ghz",
    suffix: <Icon name="IconWifi1" style={{ color: "secondary" }} />,
  },
]
;(
<div style={{ height: `100%`, width: 300 }}>
  <Button
    onClick={() => {
      setDisplayMobileModal(!displayMobileModal)
    }}
  >
    Toggle Display
  </Button>
  {displayMobileModal && <MobileModal
    onClose={() => {
      setDisplayMobileModal(false)
    }}
    draggable
    overflowHeight={64}
  >
    <h1 style={{ marginTop: 0, textAlign: `center`, variant: `text.heading1` }}>
      Enter Wi-Fi Password
    </h1>
    <ListSelect options={valueListItems} />
  </MobileModal>}
</div>
)
```

#### Draggable Without Overflow:

```js
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import ListSelect from '../ListSelect/ListSelect'
const [displayMobileModal, setDisplayMobileModal] = React.useState(false)
const valueListItems = [
  {
    label: "ICU 2nd Floor 2.4GHz",
    value: "icu 2nd floor 2.4ghz",
    suffix: <Icon name="IconWifi" style={{ color: "secondary" }} />,
  },
  {
    label: "ICU 1st Floor 2.4GHz",
    value: "icu 1st floor 2.4ghz",
    suffix: <Icon name="IconWifi2" style={{ color: "secondary" }} />,
  },
  {
    label: "ICU Front Desk 2.4GHz",
    value: "icu front desk 2.4ghz",
    suffix: <Icon name="IconWifi1" style={{ color: "secondary" }} />,
  },
]
;(
<div style={{ height: `100%`, width: 300 }}>
  <Button
    onClick={() => {
      setDisplayMobileModal(!displayMobileModal)
    }}
  >
    Toggle Display
  </Button>
  {displayMobileModal && <MobileModal
    onClose={() => {
      setDisplayMobileModal(false)
    }}
    draggable
  >
    <h1 style={{ marginTop: 0, textAlign: `center`, variant: `text.heading1` }}>
      Enter Wi-Fi Password
    </h1>
    <ListSelect options={valueListItems} />
  </MobileModal>}
</div>
)
```

#### Draggable And Scrollable:

```js
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import ListSelect from '../ListSelect/ListSelect'
import TextField from '../TextField/TextField'
const [displayMobileModal, setDisplayMobileModal] = React.useState(false)
const [password, setPassword] = React.useState(``)
const valueListItems = [
  {
    label: "ICU 2nd Floor 2.4GHz",
    value: "icu 2nd floor 2.4ghz",
    suffix: <Icon name="IconWifi" style={{ color: "secondary" }} />,
  },
  {
    label: "ICU 1st Floor 2.4GHz",
    value: "icu 1st floor 2.4ghz",
    suffix: <Icon name="IconWifi2" style={{ color: "secondary" }} />,
  },
  {
    label: "ICU Front Desk 2.4GHz",
    value: "icu front desk 2.4ghz",
    suffix: <Icon name="IconWifi1" style={{ color: "secondary" }} />,
  },
]
;(
<div style={{ height: `100%`, width: 300 }}>
  <Button
    onClick={() => {
      setDisplayMobileModal(!displayMobileModal)
    }}
  >
    Toggle Display
  </Button>
  {displayMobileModal && <MobileModal
    onClose={() => {
      setDisplayMobileModal(false)
    }}
    draggable
    overflowHeight={64}
    topSpacing={256}
  >
    <h1 style={{ marginTop: 0, textAlign: `center`, variant: `text.heading1` }}>
      Enter Wi-Fi Password
    </h1>
    <ListSelect options={valueListItems} />
    <div style={{ margin: `16px 0` }}>
      <TextField
        onChange={(event) => {
          setPassword(event.target.value)
        }}
        type="password"
        value={password}
      />
      <Button
        color="primary"
        onClick={() => {
          window.alert(`Connected with the password: ${password}`)
        }}
        style={{ marginTop: 20, width: `100%` }}
      >
        Connect
      </Button>
    </div>
    <span style={{ marginBottom: 24, textAlign: `justify`, variant: `body1` }}>
      <p>
        <strong>Lorem Ipsum</strong> is simply dummy text of the printing
        and typesetting industry. Lorem Ipsum has been the industry&apos;s
        standard dummy text ever since the 1500s, when an unknown printer
        took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was
        popularised in the 1960s with the release of Letraset sheets
        containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem
        Ipsum.
      </p>
      <p>
        Contrary to popular belief, Lorem Ipsum is not simply random text.
        It has roots in a piece of classical Latin literature from 45 BC,
        making it over 2000 years old. Richard McClintock, a Latin professor
        at Hampden-Sydney College in Virginia, looked up one of the more
        obscure Latin words, consectetur, from a Lorem Ipsum passage, and
        going through the cites of the word in classical literature,
        discovered the undoubtable source. Lorem Ipsum comes from sections
        1.10.32 and 1.10.33 of &ldquo;de Finibus Bonorum et Malorum&ldquo;
        (The Extremes of Good and Evil) by Cicero, written in 45 BC. This
        book is a treatise on the theory of ethics, very popular during the
        Renaissance. The first line of Lorem Ipsum, &ldquo;Lorem ipsum dolor
        sit amet..&ldquo;, comes from a line in section 1.10.32.{" "}
      </p>
      <p>
        The standard chunk of Lorem Ipsum used since the 1500s is reproduced
        below for those interested. Sections 1.10.32 and 1.10.33 from
        &ldquo;de Finibus Bonorum et Malorum&ldquo; by Cicero are also
        reproduced in their exact original form, accompanied by English
        versions from the 1914 translation by H. Rackham.
      </p>
      <p>
        It is a long established fact that a reader will be distracted by
        the readable content of a page when looking at its layout. The point
        of using Lorem Ipsum is that it has a more-or-less normal
        distribution of letters, as opposed to using 'Content here, content
        here', making it look like readable English. Many desktop publishing
        packages and web page editors now use Lorem Ipsum as their default
        model text, and a search for 'lorem ipsum' will uncover many web
        sites still in their infancy. Various versions have evolved over the
        years, sometimes by accident, sometimes on purpose (injected humour
        and the like).
      </p>
      <p>
        There are many variations of passages of Lorem Ipsum available, but
        the majority have suffered alteration in some form, by injected
        humour, or randomised words which don't look even slightly
        believable. If you are going to use a passage of Lorem Ipsum, you
        need to be sure there isn't anything embarrassing hidden in the
        middle of text. All the Lorem Ipsum generators on the Internet tend
        to repeat predefined chunks as necessary, making this the first true
        generator on the Internet. It uses a dictionary of over 200 Latin
        words, combined with a handful of model sentence structures, to
        generate Lorem Ipsum which looks reasonable. The generated Lorem
        Ipsum is therefore always free from repetition, injected humour, or
        non-characteristic words etc.
      </p>
    </span>
  </MobileModal>}
</div>
)
```

#### Draggable And Fullscreen:

```js
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import ListSelect from '../ListSelect/ListSelect'
import TextField from '../TextField/TextField'
const [displayMobileModal, setDisplayMobileModal] = React.useState(false)
const [password, setPassword] = React.useState(``)
const valueListItems = [
  {
    label: "ICU 2nd Floor 2.4GHz",
    value: "icu 2nd floor 2.4ghz",
    suffix: <Icon name="IconWifi" style={{ color: "secondary" }} />,
  },
  {
    label: "ICU 1st Floor 2.4GHz",
    value: "icu 1st floor 2.4ghz",
    suffix: <Icon name="IconWifi2" style={{ color: "secondary" }} />,
  },
  {
    label: "ICU Front Desk 2.4GHz",
    value: "icu front desk 2.4ghz",
    suffix: <Icon name="IconWifi1" style={{ color: "secondary" }} />,
  },
]
;(
<div style={{ height: `100%`, width: 300 }}>
  <Button
    onClick={() => {
      setDisplayMobileModal(!displayMobileModal)
    }}
  >
    Toggle Display
  </Button>
  {displayMobileModal && <MobileModal
    onClose={() => {
      setDisplayMobileModal(false)
    }}
    draggable
    overflowHeight={64}
    topSpacing={0}
  >
    <h1 style={{ marginTop: 0, textAlign: `center`, variant: `text.heading1` }}>
      Enter Wi-Fi Password
    </h1>
    <ListSelect options={valueListItems} />
    <div style={{ margin: `16px 0` }}>
      <TextField
        onChange={(event) => {
          setPassword(event.target.value)
        }}
        type="password"
        value={password}
      />
      <Button
        color="primary"
        onClick={() => {
          window.alert(`Connected with the password: ${password}`)
        }}
        style={{ marginTop: 20, width: `100%` }}
      >
        Connect
      </Button>
    </div>
    <span style={{ marginBottom: 24, textAlign: `justify`, variant: `body1` }}>
      <p>
        <strong>Lorem Ipsum</strong> is simply dummy text of the printing
        and typesetting industry. Lorem Ipsum has been the industry&apos;s
        standard dummy text ever since the 1500s, when an unknown printer
        took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was
        popularised in the 1960s with the release of Letraset sheets
        containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem
        Ipsum.
      </p>
      <p>
        Contrary to popular belief, Lorem Ipsum is not simply random text.
        It has roots in a piece of classical Latin literature from 45 BC,
        making it over 2000 years old. Richard McClintock, a Latin professor
        at Hampden-Sydney College in Virginia, looked up one of the more
        obscure Latin words, consectetur, from a Lorem Ipsum passage, and
        going through the cites of the word in classical literature,
        discovered the undoubtable source. Lorem Ipsum comes from sections
        1.10.32 and 1.10.33 of &ldquo;de Finibus Bonorum et Malorum&ldquo;
        (The Extremes of Good and Evil) by Cicero, written in 45 BC. This
        book is a treatise on the theory of ethics, very popular during the
        Renaissance. The first line of Lorem Ipsum, &ldquo;Lorem ipsum dolor
        sit amet..&ldquo;, comes from a line in section 1.10.32.{" "}
      </p>
      <p>
        The standard chunk of Lorem Ipsum used since the 1500s is reproduced
        below for those interested. Sections 1.10.32 and 1.10.33 from
        &ldquo;de Finibus Bonorum et Malorum&ldquo; by Cicero are also
        reproduced in their exact original form, accompanied by English
        versions from the 1914 translation by H. Rackham.
      </p>
      <p>
        It is a long established fact that a reader will be distracted by
        the readable content of a page when looking at its layout. The point
        of using Lorem Ipsum is that it has a more-or-less normal
        distribution of letters, as opposed to using 'Content here, content
        here', making it look like readable English. Many desktop publishing
        packages and web page editors now use Lorem Ipsum as their default
        model text, and a search for 'lorem ipsum' will uncover many web
        sites still in their infancy. Various versions have evolved over the
        years, sometimes by accident, sometimes on purpose (injected humour
        and the like).
      </p>
      <p>
        There are many variations of passages of Lorem Ipsum available, but
        the majority have suffered alteration in some form, by injected
        humour, or randomised words which don't look even slightly
        believable. If you are going to use a passage of Lorem Ipsum, you
        need to be sure there isn't anything embarrassing hidden in the
        middle of text. All the Lorem Ipsum generators on the Internet tend
        to repeat predefined chunks as necessary, making this the first true
        generator on the Internet. It uses a dictionary of over 200 Latin
        words, combined with a handful of model sentence structures, to
        generate Lorem Ipsum which looks reasonable. The generated Lorem
        Ipsum is therefore always free from repetition, injected humour, or
        non-characteristic words etc.
      </p>
    </span>
  </MobileModal>}
</div>
)
```

#### Draggable And Dismissible:

```js
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import ListSelect from '../ListSelect/ListSelect'
const [displayMobileModal, setDisplayMobileModal] = React.useState(false)
const valueListItems = [
  {
    label: "ICU 2nd Floor 2.4GHz",
    value: "icu 2nd floor 2.4ghz",
    suffix: <Icon name="IconWifi" style={{ color: "secondary" }} />,
  },
  {
    label: "ICU 1st Floor 2.4GHz",
    value: "icu 1st floor 2.4ghz",
    suffix: <Icon name="IconWifi2" style={{ color: "secondary" }} />,
  },
  {
    label: "ICU Front Desk 2.4GHz",
    value: "icu front desk 2.4ghz",
    suffix: <Icon name="IconWifi1" style={{ color: "secondary" }} />,
  },
]
;(
<div style={{ height: `100%`, width: 300 }}>
  <Button
    onClick={() => {
      setDisplayMobileModal(!displayMobileModal)
    }}
  >
    Toggle Display
  </Button>
  {displayMobileModal && <MobileModal
    onClose={() => {
      setDisplayMobileModal(false)
    }}
    dismissible
    draggable
    overflowHeight={64}
  >
    <h1 style={{ marginTop: 0, textAlign: `center`, variant: `text.heading1` }}>
      Enter Wi-Fi Password
    </h1>
    <ListSelect options={valueListItems} />
  </MobileModal>}
</div>
)
```
