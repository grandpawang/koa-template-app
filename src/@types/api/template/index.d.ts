
declare namespace template {

  /**
   * @id template.add
   */
  interface add {
    /**
     * @default "test"
     */
    name: string;
    description: string;
    /**
     * @TJS-format email
     */
    email: string;
  }

  /**
   * @id template.first
   */
  interface first {
    name: string
    /**
     * @TJS-format email
     */
    email: string;
  }

}
