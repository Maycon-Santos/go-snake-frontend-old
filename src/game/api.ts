type Response<TResult = undefined> = {
  success: boolean
  type?: string
  message?: string
  result: TResult
}

type SignInFields = {
  username: string
  password: string
}

type SignInResult = {
  access_token: string
}

class API {
  private token = localStorage.getItem('token')
  private baseUrl = process.env.API_BASE_URL as string

  constructor() {}

  private async request<TResponse>(
    input: RequestInfo | URL,
    init?: RequestInit | undefined,
  ): Promise<TResponse> {
    return fetch(input, init)
      .then((response) => response.json())
      .then((data) => data as TResponse)
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token)
    this.token = token
  }

  public async signIn(data: SignInFields): Promise<Response<SignInResult>> {
    const response = await this.request<Response<SignInResult>>(
      `${this.baseUrl}/v1/signin`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
    )

    if (response.success) {
      this.setToken(response.result.access_token)
    }

    return response
  }

  public async signUp(data: SignInFields): Promise<Response<SignInResult>> {
    const response = await this.request<Response<SignInResult>>(
      `${this.baseUrl}/v1/signup`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
    )

    if (response.success) {
      this.setToken(response.result.access_token)
    }

    return response
  }

  public createRoom(): void {}

  public enterRoom(): void {}
}

export default new API()
