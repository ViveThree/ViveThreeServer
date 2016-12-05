"use strict";

export abstract class BaseController {
  protected storageManager: any;

  constructor(storageManager?: any) {
    this.storageManager = storageManager;
  }
}
