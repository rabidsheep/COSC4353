/**
 * Configuration class needed in base class.
 * The config is provided to the API client at initialization time.
 * API clients inherit from #AuthorizedApiBase and provide the config.
 */
export class IConfig {
  constructor() { }
  /**
   * Returns a valid value for the Authorization header.
   * Used to dynamically inject the current auth header.
   */
  getAuthorization() {
    let jwt = localStorage.getItem('jwt');
    return `Bearer ${jwt}`;
  }
}

export class AuthorizedApiBase {
  private readonly config: IConfig = new IConfig();

  protected transformOptions = (options: RequestInit): Promise<RequestInit> => {
    options.headers = {
      ...options.headers,
      Authorization: this.config.getAuthorization(),
    };
    return Promise.resolve(options);
  };

  protected transformResult = async (url: string, response: Response, processor: (response: Response) => Promise<any>): Promise<any> => {
    //console.log("Service call: " + url);
    //console.log('response: ', response);

    return processor(response);
  };
}