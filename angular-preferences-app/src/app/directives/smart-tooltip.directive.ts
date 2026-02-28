import { Directive, Input, inject, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { TooltipService } from '../services/tooltip.service';
import { TooltipConfig } from '../models/tooltip.model';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
  hostDirectives: [
    {
      directive: MatTooltip,
      inputs: ['matTooltipDisabled: disabled'] 
    }
  ]
})
export class SmartTooltipDirective implements OnChanges {
  private matTooltip = inject(MatTooltip);
  private tooltipService = inject(TooltipService);

  @Input('appTooltip') config!: string | TooltipConfig;

  private activeConfig!: TooltipConfig;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.applyConfiguration();
    }
  }

  private applyConfiguration() {
    this.activeConfig = this.tooltipService.getConfig(this.config);

    this.matTooltip.message = this.activeConfig.message;
    this.matTooltip.position = this.activeConfig.position!;
    this.matTooltip.showDelay = this.activeConfig.showDelay!;
    
    if (this.activeConfig.isDisabled) {
      this.matTooltip.disabled = true;
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.activeConfig?.enableTTS) {
      this.tooltipService.speak(this.activeConfig.message);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    // needs validation
    // window.speechSynthesis.cancel();
  }
}