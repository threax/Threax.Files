param (
    [string]$artifactName = "Publish.zip"
)

$appFolder = "Files"
$csproj = "Files.csproj"

function Test-Error([string] $msg, [int] $code = 0){
    if($LastExitCode -ne $code){
        throw $msg;
    }
}

$scriptPath = Split-Path $script:MyInvocation.MyCommand.Path
$publishDir = "$scriptPath\Publish"
try{
    Push-Location $scriptPath

    if(Test-Path $publishDir){
        Remove-Item $publishDir -Recurse -ErrorAction Stop
    }

    try{
        Push-Location $appFolder -ErrorAction Stop
        npm install; Test-Error "Could not run npm install."
        dotnet restore $csproj; Test-Error "Could not dotnet restore $csproj."
        npm run clean; Test-Error "Could not npm run clean."
        npm run build; Test-Error "Could not npm run build"
        dotnet publish -c Release -o "$publishDir"; Test-Error "Error publishing app to $publishDir"
    }
    finally{
        Pop-Location
    }
    
    if(Test-Path $artifactName){
        Remove-Item $artifactName -Recurse -ErrorAction Stop
    }

    Compress-Archive -Path $publishDir\* -DestinationPath $artifactName -ErrorAction Stop
}
finally{
    if(Test-Path $publishDir){
        Remove-Item $publishDir -Recurse -ErrorAction Stop
    }

    Pop-Location
}