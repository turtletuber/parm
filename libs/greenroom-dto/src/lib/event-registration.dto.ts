import { 
  IsNotEmpty,
  IsString,
  Equals,
  IsNumber,
  Min,
  ValidateIf,
  IsAlpha,
  IsMongoId,
  Matches,
} from 'class-validator';
import { EventRegistration } from '@parm/greenroom-interface';
import { regex } from '@parm/util';

export class EventRegistrationDto implements EventRegistration {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  eventId: string;

  @IsNumber()
  @Min(0)
  @ValidateIf(o => o.order !== null)
  order: number | null;

  @Equals(EventRegistration)
  @IsString()
  _type: 'event-registration';

  @IsNotEmpty()
  @IsString()
  @Matches(regex.name)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(regex.name)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}