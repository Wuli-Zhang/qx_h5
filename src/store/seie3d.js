// import { getLocalStore } from './local'

if (!window.App) window.App = {}

const token = g_config.token
const host = g_config.host
const serviceHost = g_config.serviceHost
const serviceUrl = g_config.serviceUrl

export default Seie3d.Manage.init({
  container: 'main-map',
  host,
  serviceHost,
  serviceUrl,
  token
})
