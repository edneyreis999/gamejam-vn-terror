param(
    [Parameter(Mandatory = $true)][string]$Project,
    [string]$CoretoCli,
    [switch]$DryRun
)
$ErrorActionPreference = 'Stop'
$cliArguments = @((Join-Path $PSScriptRoot 'Apply-CoretoDesignSystem.mjs'), '--project', $Project, '--preset', 'coreto-default', '--json')
if ($CoretoCli) { $cliArguments += @('--coreto-cli', $CoretoCli) }
if ($DryRun) { $cliArguments += '--dry-run' }
& node @cliArguments
if ($LASTEXITCODE -ne 0) { throw 'Falha na aplicação do Design System; veja o erro JSON acima.' }
