import Cookies from "js-cookie"
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from "vitest"
import { TOKEN_EXPIRATION_DAYS } from "../lib/constants"
import { TokenService } from "./token.service"

describe("TokenService", () => {
  let tokenService: TokenService
  const testToken = "test-jwt-token"
  const emptyToken = ""

  // Спаи для методов Cookies
  let setSpy: MockInstance
  let getSpy: MockInstance
  let removeSpy: MockInstance

  beforeEach(() => {
    // Создаем спаи для оригинальных методов
    setSpy = vi.spyOn(Cookies, "set")
    getSpy = vi.spyOn(Cookies, "get")
    removeSpy = vi.spyOn(Cookies, "remove")

    tokenService = new TokenService()
  })

  afterEach(() => {
    // Восстанавливаем оригинальные методы
    vi.restoreAllMocks()
  })

  describe("setToken", () => {
    it("устанавливает токен с правильными параметрами", () => {
      tokenService.setToken(testToken)

      expect(setSpy).toHaveBeenCalledWith("TOKEN", testToken, {
        expires: TOKEN_EXPIRATION_DAYS,
        path: "/",
      })
    })

    it("не устанавливает пустой токен", () => {
      tokenService.setToken(emptyToken)
      expect(setSpy).not.toHaveBeenCalled()
    })
  })

  describe("getToken", () => {
    it("возвращает токен при его наличии", () => {
      getSpy.mockReturnValue(testToken)
      expect(tokenService.getToken()).toBe(testToken)
      expect(getSpy).toHaveBeenCalledWith("TOKEN")
    })
  })

  describe("removeToken", () => {
    it("корректно удаляет токен", () => {
      tokenService.removeToken()
      expect(removeSpy).toHaveBeenCalledWith("TOKEN")
    })
  })

  describe("hasToken", () => {
    it("возвращает true при наличии токена", () => {
      getSpy.mockReturnValue(testToken)
      expect(tokenService.hasToken()).toBe(true)
    })

    it("возвращает false при отсутствии токена", () => {
      getSpy.mockReturnValue(undefined)
      expect(tokenService.hasToken()).toBe(false)
    })
  })
})
