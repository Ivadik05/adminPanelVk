import startApplicationService from './services/application';
import startMarketService from './services/market';
import startAboutService from './services/about';
import { WebSender } from './sender';

export default function startServices() {
  let sender = new WebSender();
  startApplicationService(sender);
  startMarketService(sender);
  startAboutService(sender);
}
