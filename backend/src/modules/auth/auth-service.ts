import { supabaseClient } from "../../config/db";
import { AuthCredential } from "./auth-type";
import { AuthenticationResponse } from "./auth-response";
import { mapToAuthenticationResponse } from "./auth-mapper";

export class AuthenticationService {
  private db = supabaseClient;

  async signup(authCred: AuthCredential): Promise<AuthenticationResponse> {
    const { data, error } = await this.db.auth.signUp(authCred);
    if (error) throw error;
    this.db.auth.getSession()
    if (data.user == null || data.session == null)
      throw Error("Something went wrong!");

    return mapToAuthenticationResponse(data.user, data.session);
  }

  async signin(authCred: AuthCredential): Promise<AuthenticationResponse> {
    const { data, error } = await this.db.auth.signInWithPassword(authCred);
    if (error) throw error;
    if (data.user == null || data.session == null)
      throw Error("Something went wrong!");

    return mapToAuthenticationResponse(data.user, data.session);
  }
}
