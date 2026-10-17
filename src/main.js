import '@fontsource/space-grotesk/300.css'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import './styles/site.css'
import './styles/docs.css'
import './styles/pages.css'
import { initBackground } from './bg.js'
import { initTabs, initCopy, initScrollSpy, initNav, initIntro, initReady } from './ui.js'

initBackground()
initTabs()
initCopy()
initScrollSpy()
initNav()
initIntro()
initReady()
