import startApplicationService from './services/application';
import startMarketService from './services/market';

export default function startServices() {
  let sender = null;
  startApplicationService(sender);
  startMarketService(sender);
}
