import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import YouTube from 'react-youtube'
import { H2 } from 'src/fonts/Fonts'
import { NameSpaces, useTranslation } from 'src/i18n'
import { Cell, GridRow, Spans } from 'src/layout/GridRow'
import { useScreenSize } from 'src/layout/ScreenSize'
import Button, { BTN, SIZE } from 'src/shared/Button.3'
import menuItems, { hashNav } from 'src/shared/menu-items'
import Navigation, { NavigationTheme } from 'src/shared/Navigation'
import Photo from 'src/shared/Photo'
import { fonts, standardStyles, textStyles } from 'src/styles'

enum Paths {
  build,
  grow,
  validate,
  partner,
  connect,
  work,
}

const MOVE_Y = {
  [Paths.build]: -15,
  [Paths.grow]: -30,
  [Paths.validate]: -80,
  [Paths.partner]: -140,
  [Paths.connect]: -160,
  [Paths.work]: -180,
}

export default function Involvement() {
  const [currentPath, setPath] = React.useState(Paths.build)

  const { isMobile } = useScreenSize()

  return (
    <View style={standardStyles.darkBackground}>
      <GridRow
        nativeID={hashNav.home.partnerships}
        desktopStyle={standardStyles.blockMarginBottomTablet}
        tabletStyle={standardStyles.blockMarginBottomTablet}
        mobileStyle={standardStyles.blockMarginBottomMobile}
      >
        <Cell span={Spans.three4th}>
          <View
            style={[
              standardStyles.row,
              styles.controls,
              { transform: [{ translateX: isMobile ? MOVE_Y[currentPath] : MOVE_Y[Paths.build] }] },
            ]}
          >
            <Control setPath={setPath} currentPath={currentPath} path={Paths.build} />
            <Control setPath={setPath} currentPath={currentPath} path={Paths.grow} />
            <Control setPath={setPath} currentPath={currentPath} path={Paths.validate} />
            <Control setPath={setPath} currentPath={currentPath} path={Paths.partner} />
            <Control setPath={setPath} currentPath={currentPath} path={Paths.connect} />
            <Control setPath={setPath} currentPath={currentPath} path={Paths.work} />
          </View>
        </Cell>
      </GridRow>
      <GridRow
        desktopStyle={standardStyles.sectionMarginBottom}
        tabletStyle={standardStyles.sectionMarginBottomTablet}
        mobileStyle={standardStyles.sectionMarginBottomMobile}
      >
        <Content path={currentPath} />
      </GridRow>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {},
  buttons: {
    alignItems: 'center',
    flexWrap: 'wrap-reverse',
  },
  controls: {
    transitionProperty: 'transform',
    transitionDuration: '300ms',
    justifyContent: 'space-between',
  },
  content: {},
  textArea: {
    minHeight: 120,
  },
  primary: {
    marginRight: 20,
  },
  secondary: {
    paddingVertical: 20,
  },
})

interface ControlProps {
  path: Paths
  currentPath: Paths
  setPath: (p: Paths) => void
}

function Control({ path, currentPath, setPath }: ControlProps) {
  const { t } = useTranslation(NameSpaces.home)
  const onPress = React.useCallback(() => setPath(path), [path, setPath])

  return (
    <Navigation
      theme={NavigationTheme.DARKGREEN}
      text={t(`involve.paths.${path}.name`)}
      selected={path === currentPath}
      onPress={onPress}
    />
  )
}

const LINKS = {
  [Paths.build]: {
    primary: 'https://docs.celo.org/v/master/developer-guide/overview/introduction',
    secondary: 'https://www.crowdcast.io/e/celo-tech-talks-part-2',
    img: require(`src/home/involvement/build.jpg`),
    preview: require(`src/home/involvement/build-preview.jpg`),
  },
  [Paths.grow]: {
    primary: 'TODO-LINK?',
    secondary: `${menuItems.COMMUNITY.link}#${hashNav.connect.fund}`,
    img: require(`src/home/involvement/grow.jpg`),
    preview: require(`src/home/involvement/grow-preview.jpg`),
  },
  [Paths.validate]: {
    primary: 'https://docs.celo.org/getting-started/mainnet/running-a-validator-in-mainnet',
    secondary: 'https://chat.celo.org',
  },
  [Paths.partner]: {
    primary: 'https://medium.com/celoorg/alliance/home',
    secondary: 'https://celo.org/alliance',
    img: require(`src/home/involvement/partner.jpg`),
    preview: require(`src/home/involvement/partner-preview.jpg`),
  },
  [Paths.connect]: {
    primary: 'https://airtable.com/shrfUJWk1eKfFcZKb',
    secondary: `${menuItems.COMMUNITY.link}#${hashNav.connect.events}`,
    img: require(`src/home/involvement/connect.jpg`),
    preview: require(`src/home/involvement/connect-preview.jpg`),
  },
  [Paths.work]: {
    primary: menuItems.JOBS.link,
    secondary: `${menuItems.COMMUNITY.link}#${hashNav.connect.fellowship}`,
    img: require(`src/home/involvement/work.jpg`),
    preview: require(`src/home/involvement/work-preview.jpg`),
  },
}

function Content({ path }) {
  const { t } = useTranslation(NameSpaces.home)
  const { isMobile } = useScreenSize()
  return (
    <>
      <Cell span={Spans.half} style={styles.root}>
        <View style={styles.content} nativeID={Paths[path]}>
          <H2 style={textStyles.invert}>{t(`involve.paths.${path}.title`)}</H2>
          <Text
            style={[fonts.p, textStyles.invert, standardStyles.elementalMargin, styles.textArea]}
          >
            {t(`involve.paths.${path}.text`)}
          </Text>
          <View style={[standardStyles.row, styles.buttons]}>
            <Button
              kind={BTN.PRIMARY}
              text={t(`involve.paths.${path}.primary`)}
              style={styles.primary}
              href={LINKS[path].primary}
            />
            <Button
              kind={BTN.NAKED}
              text={t(`involve.paths.${path}.secondary`)}
              size={SIZE.normal}
              style={styles.secondary}
              href={LINKS[path].secondary}
            />
          </View>
        </View>
      </Cell>
      {!isMobile && (
        <Cell span={Spans.half}>
          {path === Paths.validate ? (
            <Video />
          ) : (
            <Photo
              key={path}
              image={LINKS[path].img}
              ratio={470 / 290}
              preview={LINKS[path].preview}
            />
          )}
        </Cell>
      )}
    </>
  )
}

function useDimensions(elementRef) {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 })
  React.useLayoutEffect(() => {
    const el = elementRef.current
    debugger

    el.parentElement

    setDimensions({ width: el.clientWidth, height: el.clientHeight })
  }, [elementRef])
  return [dimensions]
}

function Video() {
  const divRef = React.useRef(null)
  const [dimensions] = useDimensions(divRef)

  console.log(dimensions.width, dimensions.height)

  return (
    <View ref={divRef} style={{ width: '100%', height: '100%' }}>
      <YouTube
        videoId={'AEARt0AxyoU'}
        opts={{ ...youtubePlayerOptions, width: dimensions.width, height: dimensions.height }}
        // onReady={onReady}
      />
    </View>
  )
}

const youtubePlayerOptions = {
  playerVars: {
    width: '100%',
    height: 20,
    // https://developers.google.com/youtube/player_parameters
    controls: 1,
    playsinline: 1,
    modestbranding: 1,
  },
}
