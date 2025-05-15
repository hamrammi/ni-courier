export default interface HttpApi {
  refreshTokens (refreshToken: string): Promise<{ accessToken: string, refreshToken: string }>,
}
