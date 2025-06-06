import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { REGEX } from '@Shared/constant/common.constants';
import { EUrlType } from '@Shared/enum/EUrlType';
import { isSpotifyLink, isVimeoLink, isYouTubeLink } from '@Shared/helper/media.helper';

export default class ValidatorsCustom {
  static editorRequired(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.trim();
      const isEmpty =
        /^(\s*<(p|div|h[1-6]|span|strong|em|b|i|u|br|blockquote|pre|code|section|article|aside|footer|header|nav|figure|figcaption|address|main|summary|details|mark|time|small|sub|sup|del|ins|a|ul|ol|li|dl|dt|dd|table|tr|th|td|tbody|thead|tfoot|col|colgroup|caption|fieldset|legend|label|form|input|textarea|select|button|option|optgroup|datalist|output|progress|meter|svg|path|g|line|rect|circle|polyline|polygon|text|tspan|textPath|use|defs|symbol|clippath|mask|pattern|marker|foreignObject|desc|title|filter|feBlend|feColorMatrix|feComponentTransfer|feComposite|feConvolveMatrix|feDiffuseLighting|feDisplacementMap|feDistantLight|feFlood|feFuncA|feFuncB|feFuncG|feFuncR|feGaussianBlur|feImage|feMerge|feMergeNode|feMorphology|feOffset|fePointLight|feSpecularLighting|feSpotLight|feTile|feTurbulence|animate|animateTransform|animateMotion|mpath|set)\b[^>]*>\s*<\/\2>\s*)+$/i.test(
          value
        );

      return isEmpty || !value ? { required: true, message } : null;
    };
  }

  static url(urlTypes: EUrlType[], message: string): ValidatorFn {
    const errors = {
      [EUrlType.YOUTUBE]: { youtubeUrl: true, message },
      [EUrlType.VIMEO]: { vimeoUrl: true, message },
      [EUrlType.SPOTIFY]: { spotifyUrl: true, message }
    };

    const validators = {
      [EUrlType.YOUTUBE]: isYouTubeLink,
      [EUrlType.VIMEO]: isVimeoLink,
      [EUrlType.SPOTIFY]: isSpotifyLink
    };

    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.trim();
      if (!value) {
        return null;
      }

      try {
        new URL(value);
      } catch {
        return { invalidUrl: true, message };
      }

      for (const type of urlTypes) {
        const validator = validators[type];
        if (validator && validator(value)) {
          return null; // Valid for at least one type
        }
      }

      // If none matched, return the first error for the first type
      const firstType = urlTypes[0];
      return errors[firstType] || { invalidLink: true, message };
    };
  }

  static fieldsMatch(sourceField: string, targetField: string, errorMessage: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const sourceControl = formGroup.get(sourceField);
      const targetControl = formGroup.get(targetField);

      if (!sourceControl || !targetControl) return null;

      if (!targetControl.errors && sourceControl.value !== targetControl.value) {
        targetControl.setErrors({
          mismatch: {
            expected: sourceControl.value,
            actual: targetControl.value
          },
          message: errorMessage
        });
        return { mismatch: true, message: errorMessage };
      }

      return null;
    };
  }

  static passwordStrengthValidator(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control?.value && !control?.value?.match(REGEX.PASSWORD)) {
            return { password: true, message };
        }
        return null;
    };
}

}
