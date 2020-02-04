import { 
  IsNotEmpty,
  IsString,
  Equals,
  IsHexadecimal,
  IsNumber,
  Min,
  ValidateIf,
} from 'class-validator';
import { EventRegistration } from '@parm/greenroom-interface';

export class EventRegistrationDto implements EventRegistration {
  @IsString()
  @IsNotEmpty()
  @IsHexadecimal()
  eventId: string;

  @IsNumber()
  @Min(0)
  @ValidateIf(o => o.slot !== null)
  slot: number | null;

  @Equals(EventRegistration)
  @IsString()
  _type: 'event-registration';

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}