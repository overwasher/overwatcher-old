import { Controller, Get } from 'routing-controllers';

import _ from 'lodash';

@Controller()
export class IndexController {
  @Get('/')
  index() {
    // eslint-disable-next-line prettier/prettier
    return _.sample([
      'What are you looking for, internet traveller?',
      'See you, space cowboy...',
      'A sound soul dwells within a sound mind and a sound body.',
      'MOTDs are hard...',
    ]);
  }
}
